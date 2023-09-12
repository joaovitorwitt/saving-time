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
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function Header() {
  const [isSiderbarOpened, setIsSiderbarOpened] = useState(false);
  const [mousePosition, setMousePosition] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("click", handleMouseMove);
  });

  function toggleSidebar() {
    setIsSiderbarOpened(!isSiderbarOpened);
  }

  return (
    <>
      <header className="header" onClick={getMousePosition}>
        <div className="container">
          <div className="logo">
            <FontAwesomeIcon
              icon={faBars}
              className="open-sidebar-icon"
              onClick={toggleSidebar}
            />
          </div>
        </div>
      </header>

      {/* MOBILE CONTENT WHEN USER CLICKS ON BARS ICON */}
      <div
        className="mobile-content-wrapper"
        style={{ display: isSiderbarOpened ? "block" : "none" }}
      >
        <div className="mobile-content">
          <div className="close-btn-wrapper">
            <FontAwesomeIcon
              icon={faClose}
              onClick={toggleSidebar}
              className="close-sidebar-icon"
            />
          </div>
          <nav className="mobile-menu-links">
            <Link to={"/profile"} className="navlink">
              <FontAwesomeIcon icon={faUser} className="navlink-icon" />
              <p>Profile</p>
            </Link>

            <Link to={"/settings"} className="navlink">
              <FontAwesomeIcon icon={faGear} className="navlink-icon" />
              <p>Settings</p>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
