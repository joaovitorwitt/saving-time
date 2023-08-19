import { useState } from "react";

export default function AddNoteForm({ onSubmit }) {
  const [newNote, setNewNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newNote === "") return;

    onSubmit(newNote);

    setNewNote("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          value={newNote}
          id="note"
          onChange={(e) => setNewNote(e.target.value)}
          autoComplete="off"
          placeholder="Add new note"
        />
        <button className="add-note-button">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </form>
  );
}
