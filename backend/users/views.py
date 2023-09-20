from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .utils import hash_password, compare_hashed_passwords

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User

from django.core.exceptions import ObjectDoesNotExist

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

        return Response({"message": "user updated successfully"})
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

        return Response({"message": "user logged in successfully", "status" : "success"})

    except ObjectDoesNotExist:
        return Response({"message": "user does not exist"})
    except Exception as error:
        return Response({"something went wrong": str(error)})
    



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
            serializer.save()
            return Response({"message": "user successfully registered", "status": "success"})
        else:
            return Response({"message": "username already taken"})


    except Exception as error:
        return Response({"message": str(error)})