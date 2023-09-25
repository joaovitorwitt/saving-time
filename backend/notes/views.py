from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Notes
from .serializers import NotesSerializer

@api_view(['GET'])
def get_notes(request):
    """
    Retrieve a list of all notes.

    Endpoint: /api/notes/
    Method: GET

    Returns:
    - 200 OK: List of notes in the response body.
    - 500 Internal Server Error: If an error occurs during retrieval.

    Example:
    {
        "notes": [
            {"id": 1, "title": "Note 1", "content": "Content 1"},
            {"id": 2, "title": "Note 2", "content": "Content 2"}
        ]
    }
    """
    try:
        notes = Notes.objects.all()
        notes_serializer = NotesSerializer(notes, many=True)
        return Response({'notes': notes_serializer.data})
    except:
        return Response("Something went wrong")
    

@api_view(['GET'])
def get_single_note(request, id):
    """
    Retrieve a single note by ID.

    Endpoint: /api/notes/{id}/
    Method: GET

    Parameters:
    - id (int): The unique identifier of the note.

    Returns:
    - 200 OK: The requested note in the response body.
    - 404 Not Found: If the note with the given ID does not exist.
    - 500 Internal Server Error: If an error occurs during retrieval.

    Example:
    {
        "note": {"id": 1, "title": "Note 1", "content": "Content 1"}
    }
    """
    try:
        note = Notes.objects.get(id=id)
        note_serializer = NotesSerializer(note)
        return Response({'note': note_serializer.data})
    except:
        return Response("Something went wrong")
    

# todo send post request with users id
@api_view(['POST'])
def create_note(request):
    """
    Create a new note.

    Endpoint: /api/notes/
    Method: POST

    Request Body (JSON):
    - title (str): The title of the note.
    - content (str): The content of the note.

    Returns:
    - 201 Created: The newly created note in the response body.
    - 400 Bad Request: If the request data is invalid.
    - 500 Internal Server Error: If an error occurs during creation.

    Example Request Body:
    {
        "title": "New Note",
        "content": "This is a new note."
    }

    Example Response:
    {
        "note successfully created": {"id": 3, "title": "New Note", "content": "This is a new note."}
    }
    """
    try:
        serializer = NotesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"note successfully created": serializer.data})
        else:
            return Response({"error": serializer.error_messages})
    except:
        return Response("Something went wrong")
    


@api_view(['DELETE'])
def delete_note(request, id):
    """
    Delete a note by ID.

    Endpoint: /api/notes/{id}/
    Method: DELETE

    Parameters:
    - id (int): The unique identifier of the note to delete.

    Returns:
    - 200 OK: If the note is successfully deleted.
    - 404 Not Found: If the note with the given ID does not exist.
    - 500 Internal Server Error: If an error occurs during deletion.
    """
    try:
        desired_note = Notes.objects.get(id=id)
        desired_note.delete()

        return Response({"message": "note successfully deleted"})
    except Exception as error:
        return Response({"message": error})
    


@api_view(['PUT'])
def update_note(request,id):
    """
    Update a note by ID.

    Endpoint: /api/notes/{id}/
    Method: PUT

    Parameters:
    - id (int): The unique identifier of the note to update.

    Request Body (JSON):
    - title (str): The updated title of the note.
    - content (str): The updated content of the note.

    Returns:
    - 200 OK: If the note is successfully updated.
    - 404 Not Found: If the note with the given ID does not exist.
    - 400 Bad Request: If the request data is invalid.
    - 500 Internal Server Error: If an error occurs during update.
    """
    try:
        note_for_update = Notes.objects.get(id=id)

        note_for_update.title = request.data['title']
        note_for_update.content = request.data['content']

        note_for_update.save()

        note_serialized = NotesSerializer(note_for_update)

        return Response({"note successfully updated": note_serialized.data})
    except Exception as error:
        return Response({"message": error})