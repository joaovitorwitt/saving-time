from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['GET'])
def return_user_info_on_homepage(request):
    try:
        return Response({"message": "user info retrieved successfully"})
    except Exception as error:
        return Response({"message": "something went wrong", })