from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(["GET"])
def list_notes(request):
    return Response("working")


@api_view(["GET"])
def list_single_note(request, id):
    return Response("single note")