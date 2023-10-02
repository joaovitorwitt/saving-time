from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .utils import hash_password, compare_hashed_passwords

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import login, login
from django.core.exceptions import ObjectDoesNotExist

from graphics.models import TotalLifeTimeFocus, UserProgressReport
from graphics.serializers import TotalLifeTimeFocusSerializer, UserProgressReportSerializer

from datetime import datetime

# Create your views here.
@api_view(['GET'])
def list_users(request):
    try:
        users = User.objects.all()
        user_serializer = UserSerializer(users, many=True)

        return Response({"users": user_serializer.data})
    except Exception as e:
        return Response({"message": str(e)})
    

@api_view(['POST'])
def create_user(request):
    try:
        hashed_password = hash_password(request.data["password"])
        user_data = request.data.copy()
        user_data["password"] = hashed_password
        user_serializer = UserSerializer(data=user_data)

        # query emails from database
        existing_email = User.objects.filter(email=user_data["email"]).first()
        if existing_email:
            return Response({"message": "email already exists"})

        if user_serializer.is_valid():
            user_serializer.save()
            return Response({"user created successfully": user_serializer.data})
        else:
            return Response({"message": user_serializer.errors})

    except Exception as e:
        return Response({"message": str(e)})
    

@api_view(['POST'])
def create_focus_instance(request):
    try:
        # TODO: modify request to use the user report model instead
        id_from_request = request.data["user"]
        if TotalLifeTimeFocus.objects.filter(user=id_from_request):
            return Response({"message": "user focus instance already exists"})

        user_serializer = TotalLifeTimeFocusSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()

            return Response({"message": "user focus instance created", "data": user_serializer.data})
        else:
            return Response({"message": "something went wrong", "data": user_serializer.errors})

    except Exception as error:
        return Response({"message": str(error)})


@api_view(['POST'])
def generate_token_for_user(request):
    try:
        username = request.data["username"]
        password = request.data["password"]

        user = User.objects.get(username=username)
        if compare_hashed_passwords(password, user.password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        else:
            return Response({"message": 'credentials are invalid'})
    except Exception as error:
        return Response({"message": str(error)})



@api_view(['GET'])
def get_single_user(request, id):
    try:
        user = User.objects.get(id=id)
        user_serializer = UserSerializer(user)
        return Response({"user": user_serializer.data})

    except Exception as error:
        return Response({"message": str(error)})
    


@api_view(['PUT'])
def update_user(request, id):
    try:
        user_for_update = User.objects.get(id=id)

        user_for_update.username = request.data["username"]
        user_for_update.email = request.data["email"]
        user_for_update.password = hash_password(request.data["password"])

        user_for_update.save()

        return Response({"message": "user updated successfully", "status" :"success"})
    except Exception as error:
        return Response({"message": str(error)})
    

@api_view(['DELETE'])
def delete_user(request, id):
    try:
        user_for_deletion = User.objects.get(id=id)
        user_for_deletion.delete()

        return Response({"message": "user deleted successfully"})
    
    except Exception as error:
        return Response({"message": str(error)})
    


@api_view(['POST'])
def login_user(request):
    try:
        username = request.data["username"]
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.get(username=username)

        if email != user.email:
            return Response({"message": "invalid email"})

        if not compare_hashed_passwords(password, user.password):
            return Response({"message": "invalid password",})

        refresh = RefreshToken.for_user(user)
        login(request, user)

        return Response({"message": "user logged in successfully", "status" : "success", "refresh": str(refresh), "access": str(refresh.access_token)})

    except ObjectDoesNotExist:
        return Response({"message": "user does not exist"})
    except Exception as error:
        return Response({"something went wrong": str(error)})
    


@api_view(['POST'])
def generate_focus_instance_v2(request):
    try:
        user_id_from_request = request.data['user']
        today = datetime.today().strftime("%Y-%m-%d")

        if UserProgressReport.objects.filter(user=user_id_from_request, date=today).exists():
            return Response({"message": "user instance already exists"})

        instance_serializer = UserProgressReportSerializer(data=request.data)
        if instance_serializer.is_valid():
            instance_serializer.save()
            return Response({"message": "user instance created", "data": instance_serializer.data})
        else:
            return Response({"message": "something went wrong", "data": instance_serializer.errors})
    except Exception as error:
        return Response({"message": str(error)})


@api_view(['POST'])
def register_user(request):
    try:
        serializer = UserSerializer(data=request.data)

        email = request.data["email"]

        password = request.data["password"]
        confirm_password = request.data["confirm_password"]

        if password != confirm_password:
            return Response({"message": "passwords dont match"})
        
        # check if email already exists
        if User.objects.filter(email=email).exists():
            return Response({"message": "email already exists"})
        
        if serializer.is_valid():
            hashed_password = hash_password(serializer.validated_data["password"])
            serializer.validated_data["password"] = hashed_password
            # login(request, serializer)
            serializer.save()
            user = User.objects.get(username=request.data["username"])
            refresh = RefreshToken.for_user(user)
            login(request, user)
            return Response({"message": "user successfully registered", "status": "success", "refresh": str(refresh), "access": str(refresh.access_token)})
        else:
            return Response({"message": "username already taken"})
    except Exception as error:
        return Response({"message": str(error)})



@api_view(["PUT"])
def update_username(request, id):
    try:
        username_for_update = request.data['username']
        password_from_request = request.data['password']
        user = User.objects.get(id=id)

        # 1st validate if password is correct for that user
        if not compare_hashed_passwords(password_from_request, user.password):
            return Response({"message": "wrong password", "password from request": password_from_request, "password from database": user.password})
        
        # 2nd check if new username already exists on the database
        users_from_database = User.objects.filter(username=username_for_update).first()
        if users_from_database:
            return Response({"message": "username already exists"})
        
        # 3rd set username for update to the one from the database
        user.username = username_for_update
        user.save()
        return Response({"message": "username updated successfully", "status" : "success"})

    except Exception as error:
        return Response({"message": "something went wrong", "error": str(error)})
    

@api_view(['PUT'])
def update_password(request, id):
    try:
        user = User.objects.get(id=id)
        old_password_from_request = request.data["old_password"]
        new_password_from_request = request.data["new_password"]
        confirm_new_password_from_request = request.data["confirm_new_password"]

        # 1st check if old password actually matches with the one from the database
        if not compare_hashed_passwords(old_password_from_request, user.password):
            return Response({"message": "invalid current password"})
        
        # 2nd check if new password fields are equal
        if new_password_from_request != confirm_new_password_from_request:
            return Response({"message": "passwords dont match"})
        
        # 3rd check if new password is not equal to old password
        if new_password_from_request == old_password_from_request: # also new password == confirm new password
            return Response({"message": "new password is equal to old one"})
        
        user.password = hash_password(new_password_from_request)
        user.save()

        return Response({"message": "password updated successfully", "status": "success"})

    except Exception as error:
        return Response({"message": "something went wrong"})
    

# TODO: create request that validates current username, password and 'delete' string
# if the request returns true, then return the users id
@api_view(['POST'])
def validating_user_information_for_deletion(request, id):
    try:
        user = User.objects.get(id=id)

        current_username_from_request = request.data["username"]
        current_password_from_request = request.data["password"]
        delete_string_from_request = request.data["delete_string"]

        if current_username_from_request != user.username:
            return Response({"message": "username is wrong"})
        if not compare_hashed_passwords(current_password_from_request, user.password):
            return Response({"message": "invalid password"})
        
        if delete_string_from_request != "delete":
            return Response({"message": "invalid confirmation string"})
        
        # this is a post request
        # we should call the delete user request passing the id????
        return Response({"message": "delete method called", "ID": "id"})

    except Exception as error:
        return Response({"message": "something went wrong", "error": str(error)})