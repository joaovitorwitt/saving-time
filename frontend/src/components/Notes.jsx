import { useState, useEffect } from "react";
import "../assets/styles/Notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../main";
import Navbar from "./Navbar";

export default function Notes() {
  const userId = JSON.parse(localStorage.getItem("userInfo")).user_id;
  const [notes, setNotes] = useState([]);
  const { currentTheme } = useTheme();

  // note creation feature
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

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
      fetchUserNotes();
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

  async function createNote() {
    // event.preventdefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/create/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: noteTitle,
          content: noteContent,
          user: userId,
        }),
      });

      const data = await response.json();
      console.log(data);
      fetchUserNotes();
      setNoteTitle("");
      setNoteContent("");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="notes-component" data-theme={currentTheme}>
        <h3 className="notes-card-title">All your notes</h3>
        <form className="create-note-form">
          <input
            type="text"
            placeholder="add note title"
            className="add-note-input"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <textarea
            placeholder="add note content"
            className="add-note-input"
            type="text"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faPlus}
            className="add-note-icon"
            onClick={createNote}
          />
        </form>
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
      </div>
    </>
  );
}
