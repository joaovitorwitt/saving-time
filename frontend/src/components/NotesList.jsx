// simply list all notes

import NotesCard from "./NoteCard";

export default function NotesList({ notes, deleteNote }) {
  return (
    <div className="card-wrapper">
      {notes.length === 0 && "No Notes Available"}
      {notes.map((note) => {
        return <NotesCard {...note} key={note.id} deleteNote={deleteNote} />;
      })}
    </div>
  );
}
