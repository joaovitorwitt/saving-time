from django.urls import path, include
from . import views

urlpatterns = [
    path("homepage/", views.return_user_info_on_homepage, name="homepage")
]