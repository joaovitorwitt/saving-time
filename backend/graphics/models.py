from django.db import models
from django.contrib.auth.models import User
from datetime import date

# Create your models here.
class WeeklyFocusTime(models.Model):
    class Meta:
        db_table = "WeeklyFocusTime"

    # user_id FIELD
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    week_start_date = models.DateField()
    day_of_week = models.CharField(max_length=9)
    total_focus_time_hours = models.FloatField()
    week_number = models.IntegerField()



class TotalLifeTimeFocus(models.Model):
    class Meta:
        db_table = "TotalLifeTimeFocus"

    # user_id FIELD
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    overall_focus_time_hours = models.FloatField(default=0.0)
    last_updated = models.DateTimeField(auto_now_add=True)


class DailyFocusTime(models.Model):
    class Meta:
        db_table = "DailyFocusTime"

    # user_id FIELD
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    focus_time = models.FloatField(default=0.0)
    day_of_week = models.CharField(max_length=9)
    date = models.DateTimeField(auto_now_add=True)



class UserProgressReport(models.Model):
    class Meta:
        db_table = "UserProgressReport"

    # user_id as in 2
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    date = models.DateField()
    day_of_the_week = models.CharField(max_length=9)
    week_number = models.IntegerField()
    focus_time = models.FloatField(default=0.0)

    def save(self, *args, **kwargs):
        # Ensure that the 'date' field is a date object (without time information)
        if not isinstance(self.date, date):
            self.date = self.date.date()
        super(UserProgressReport, self).save(*args, **kwargs)