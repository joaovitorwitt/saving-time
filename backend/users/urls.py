from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    path('get/users', views.list_users, name="list_users"),
    path('create/user', views.create_user, name="create_user"),
    path('get/user/<int:id>', views.get_single_user, name="get_single_user"),
    path('update/user/<int:id>', views.update_user, name="update_user"),
    path('delete/user/<int:id>', views.delete_user, name="delete_user"),
    ################################################################
    path('token/', views.generate_token_for_user, name='token_obtain_pair'),
    path("token/refresh", TokenRefreshView.as_view(), name='token_refresh'),
    ################################################################
    path('login/', views.login_user, name='login'),
    path('register/', views.register_user, name='register'),
]