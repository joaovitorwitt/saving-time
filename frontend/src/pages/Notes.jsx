import { useState } from "react";
import AddNoteForm from "../components/AddNoteForm";
import NotesList from "../components/NotesList";
import Sidebar from "../components/Sidebar";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  function createNote(body) {
    setNotes((currentNotes) => {
      const currentDate = new Date();

      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const formattedDate = `${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }, ${currentDate.getFullYear()}`;

      return [
        ...currentNotes,
        { id: crypto.randomUUID(), body, creationTime: formattedDate },
      ];
    });
  }

  function deleteNote(id) {
    setNotes((currentNotes) => {
      return currentNotes.filter((note) => note.id !== id);
    });
  }

  return (
    <div className="grid-container-notes">
      <div className="notes-header-wrapper">
        <h1>My Notes</h1>
        <AddNoteForm onSubmit={createNote} />
      </div>
      <Sidebar />
      <NotesList notes={notes} deleteNote={deleteNote} />
    </div>
  );
}
