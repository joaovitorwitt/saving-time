from django.urls import path, include
from . import views

urlpatterns = [
    path('get/users', views.list_users, name="list_users"),
    path('create/user', views.create_user, name="create_user"),
    path('get/user/<int:id>', views.get_single_user, name="get_single_user"),
    path('update/user/<int:id>', views.update_user, name="update_user"),
    path('delete/user/<int:id>', views.delete_user, name="delete_user"),
]