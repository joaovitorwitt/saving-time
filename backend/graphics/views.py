from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TotalLifeTimeFocus, WeeklyFocusTime, UserProgressReport
from .serializers import TotalLifeTimeFocusSerializer, WeeklyFocusTimeSerializer, UserProgressReportSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.db.models import Sum
from datetime import datetime

from .utils import get_current_week_of_the_year, get_todays_date


@api_view(['GET'])
def get_weekly_report(request, id):
    try:
        current_week = get_current_week_of_the_year()
        user_weekly_focus = UserProgressReport.objects.filter(user=id, week_number=current_week)
        user_weekly_focus_serializer = UserProgressReportSerializer(user_weekly_focus, many=True)
        return Response({"message": "here is your weekly report", "data": user_weekly_focus_serializer.data})
    except Exception as error:
        return Response({"message": str(error)})
    

@api_view(['GET'])
def get_users_daily_report(request, id):
    try:
        today = get_todays_date()
        user_daily_focus = UserProgressReport.objects.filter(user=id, date=today).first()
        user_daily_focus_serializer = UserProgressReportSerializer(user_daily_focus)
        return Response({"message": "here is your daily report", "data": user_daily_focus_serializer.data['focus_time']})
    except Exception as error:
        return Response({"message": str(error)}) 
    

@api_view(['GET'])
def get_user_total_focus_time(request, id):
    try:
        lifetime_focus = UserProgressReport.objects.filter(user=id).aggregate(total_focus=Sum('focus_time'))
        total_focus_time = lifetime_focus['total_focus']

        return Response({"message": "here is your overall focus time", "data": total_focus_time})
    except Exception as error:
        return Response({"message": str(error)})


@api_view(['PUT'])
def update_total_focus_time(request, id):
    try:
        today = get_todays_date()
        user_focus_for_update = UserProgressReport.objects.filter(user=id, date=today).first()

        if today == str(user_focus_for_update.date):
            user_focus_for_update.focus_time += request.data["focus_time"]
            user_focus_for_update.save()
            return Response({"message": "User's focus time updated"})
        else:
            return Response({"message": "something went wrong"})

    except Exception as error:
        return Response({"message": str(error)}, status=status.HTTP_400_BAD_REQUEST)