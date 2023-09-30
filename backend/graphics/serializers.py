from rest_framework import serializers
from .models import TotalLifeTimeFocus, WeeklyFocusTime, UserProgressReport



class TotalLifeTimeFocusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalLifeTimeFocus
        fields = ('user', 'overall_focus_time_hours', 'last_updated')


class WeeklyFocusTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeeklyFocusTime
        fields = "__all__"


class UserProgressReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgressReport
        fields = "__all__"