import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function NotesCard() {
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="note-text">
            <p>
              As the sun dips below the horizon, its warm embrace colors the sky
              with a breathtaking palette of golden and rosy hues, casting a
              spell of tranquility and wonder over the world.
            </p>
          </div>
          <div className="card-bottom-data">
            <div className="time">
              <p>May 21, 2020</p>
            </div>
            <div className="card-actions">
              <button className="delete-note-button">
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button className="edit-note-button">
                <FontAwesomeIcon icon={faPenNib} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
