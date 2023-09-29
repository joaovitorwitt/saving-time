from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TotalLifeTimeFocus, WeeklyFocusTime
from .serializers import TotalLifeTimeFocusSerializer, WeeklyFocusTimeSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User


@api_view(['GET'])
def get_weekly_report(request, id):
    try:
        # TODO: return only the weekdays and the focus time for each day
        user_weekly_focus = WeeklyFocusTime.objects.filter(user=id)
        user_weekly_focus_serializer = WeeklyFocusTimeSerializer(user_weekly_focus, many=True)
        return Response({"message": "here is your weekly report", "data": user_weekly_focus_serializer.data})
    except Exception as error:
        return Response({"message": str(error)})
    

# per user
@api_view(['GET'])
def get_total_focus_time(request, id):
    try:
        # return the total focus time for each user based on the id
        user_focus_time = TotalLifeTimeFocus.objects.filter(user=id).first()
        user_focus_time_serializer = TotalLifeTimeFocusSerializer(user_focus_time)

        return Response({"message": "here is your overall focus time", "data": user_focus_time_serializer.data["overall_focus_time_hours"]})
    except Exception as error:
        return Response({"message": str(error)})


# TODO: remove feature that checks if the user does not exist
@api_view(['PUT'])
def update_total_focus_time(request, id):
    try:
        # Try to find the user with the given ID
        user, created = TotalLifeTimeFocus.objects.get_or_create(user=id)

        # Update the user's focus time
        user.overall_focus_time_hours += request.data["overall_focus_time_hours"]
        user.save()

        if created:
            return Response({"message": "New user created and focus time updated"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "User's focus time updated"})

    except Exception as error:
        return Response({"message": str(error)}, status=status.HTTP_400_BAD_REQUEST)