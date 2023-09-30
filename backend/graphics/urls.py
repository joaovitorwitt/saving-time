
from django.urls import path, include
from . import views
from users.views import create_focus_instance, generate_focus_instance_v2

urlpatterns = [
    path('get/weekly/report/<int:id>', views.get_weekly_report, name="get_weekly_report"),
    ####################################################################################
    path('get/total_focus/<int:id>', views.get_total_focus_time, name="get_total_focus"),
    path('update/total_focus/<int:id>', views.update_total_focus_time, name="update_total_focus"),
    # path('create/focus_instance', create_focus_instance, name="create_focus_instance"),
    path('create/focus_instance', generate_focus_instance_v2, name="create_focus_instance"),
]