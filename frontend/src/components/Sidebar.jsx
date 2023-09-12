import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faChartColumn,
  faUser,
  faGear,
  faPen,
  faHome,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  return (
    <>
      <aside className="sidebar">
        <div className="container">
          <nav className="sidebar-wrapper">
            <Link to={"/"} className="navlink">
              <FontAwesomeIcon icon={faHome} className="navlink-icon" />
              <p>Dashboard</p>
            </Link>

            {/* <Link to={"/progress"} className="navlink">
            <FontAwesomeIcon icon={faChartColumn} className="navlink-icon" />
            <p>Progress</p>
          </Link> */}

            {/* <Link to={"/notes"} className="navlink">
            <FontAwesomeIcon icon={faPen} className="navlink-icon" />
            <p>Notes</p>
          </Link> */}

            <Link to={"/settings"} className="navlink">
              <FontAwesomeIcon icon={faGear} className="navlink-icon" />
              <p>Settings</p>
            </Link>

            {/* <Link to={"/login"} className="navlink">
            <FontAwesomeIcon icon={faUser} className="navlink-icon" />
            <p>Login</p>
          </Link> */}

            {/* <Link to={"/profile"} className="navlink">
            <FontAwesomeIcon icon={faUser} className="navlink-icon" />
            <p>Profile</p>
          </Link> */}
          </nav>
        </div>
      </aside>
      <FontAwesomeIcon icon={faBars} className="mobile-icon" />
      <aside className="sidebar-mobile">
        <div>
          <nav className="sidebar-mobile-wrapper">
            <div className="close-sidebar-wrapper">
              <FontAwesomeIcon icon={faClose} className="close-sidebar-icon" />
            </div>

            <Link to={"/"} className="navlink">
              <FontAwesomeIcon icon={faHome} className="navlink-icon" />
              <p>Dashboard</p>
            </Link>
            <Link to={"/"} className="navlink">
              <FontAwesomeIcon icon={faGear} className="navlink-icon" />
              <p>Settings</p>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
