from django.db import models
from django.contrib.auth.models import User


# Create your models here.
# class WeeklyFocusTime(models.Model):
#     class Meta:
#         db_table = "WeeklyFocusTime"

#     # user_id FIELD
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
#     week_start_date = models.DateField()
#     day_of_week = models.CharField(max_length=9)
#     total_focus_time_hours = models.FloatField()
#     week_number = models.IntegerField()



class TotalLifeTimeFocus(models.Model):
    class Meta:
        db_table = "TotalLifeTimeFocus"

    # user_id FIELD
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    overall_focus_time_hours = models.FloatField(default=0.0)
    last_updated = models.DateTimeField(auto_now_add=True)


# class DailyFocusTime(models.Model):
#     class Meta:
#         db_table = "DailyFocusTime"

#     # user_id FIELD
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)