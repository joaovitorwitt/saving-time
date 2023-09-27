from rest_framework import serializers
from .models import TotalLifeTimeFocus  

class TotalLifeTimeFocusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalLifeTimeFocus
        fields = ('user', 'overall_focus_time_hours', 'last_updated')