from django.urls import path, include
from . import views

urlpatterns = [
    path("notes", views.list_notes, name="list-notes")
]

"""
    GET api/notes/get
    GET api/notes/get/{id}
    DELETE api/notes/delete/{id}
    PUT api/notes/update/{id}
    POST api/notes/create
"""