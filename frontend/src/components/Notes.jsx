import { useState, useEffect } from "react";
import "../assets/styles/Notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Notes() {
  const userId = JSON.parse(localStorage.getItem("userInfo")).user_id;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchUserNotes();
  }, []);

  async function handleNoteDeletion(noteId) {
    console.log("NOTE DELETED");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/delete/note/${noteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log(data);
      // TODO handle IF / ELSE conditions
    } catch (error) {
      throw new Error(error);
    }
  }

  async function fetchUserNotes() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/user/notes/${userId}`
      );

      const data = await response.json();
      setNotes(data.notes);
      // TODO handle IF / ELSE conditions
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <>
      <h3 className="notes-card-title">All your notes</h3>
      <ul className="notes-wrapper">
        {notes.map((note) => {
          return (
            <li key={note.id} className="note-item">
              <div className="note-data">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>
              </div>
              <div className="note-actions">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleNoteDeletion(note.id)}
                  className="delete-note-item"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
