import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function NotesCard({ id, body, creationTime, deleteNote }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="note-text">
          <p>{body}</p>
        </div>
        <div className="card-bottom-data">
          <div className="time">
            <p>{creationTime}</p>
          </div>
          <div className="card-actions">
            <button
              onClick={() => deleteNote(id)}
              className="delete-note-button"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            {/* <button className="edit-note-button">
                <FontAwesomeIcon icon={faPenNib} />
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
