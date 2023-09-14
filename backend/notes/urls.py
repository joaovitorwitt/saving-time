from django.urls import path, include
from . import views

urlpatterns = [
    path('get/notes', views.get_notes, name="get_notes"),
    path('get/note/<int:id>', views.get_single_note, name="get_note"),
    path('create/note', views.create_note, name="create_note"),
    path('delete/note/<int:id>', views.delete_note, name="delete_note"),
    path('update/note/<int:id>', views.update_note, name="update_note")
]