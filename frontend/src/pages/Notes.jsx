import NotesCard from "../components/NoteCard";
import NotesHeader from "../components/NotesHeader";

export default function Notes() {
  return (
    <div className="container">
      <NotesHeader />
      <NotesCard />
    </div>
  );
}
