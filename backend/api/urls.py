from django.urls import path, include
from . import views

urlpatterns = [
    path("notes", views.list_notes, name="list-notes")
]

"""
    GET api/v1/notes/get
    GET api/v1/notes/get/{id}
    DELETE api/v1/notes/delete/{id}
    PUT api/v1/notes/update/{id}
    POST api/v1/notes/create
"""