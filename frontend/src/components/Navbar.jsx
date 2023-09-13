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
import "../assets/styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="navbar-item">
          <Link to={"/"} className="navbar-link">
            <FontAwesomeIcon className="navbar-icon" icon={faHome} />
            <span className="navbar-text">Home</span>
          </Link>
        </li>

        <li className="navbar-item">
          <Link to={"/progress"} className="navbar-link">
            <FontAwesomeIcon className="navbar-icon" icon={faChartColumn} />
            <span className="navbar-text">Progress</span>
          </Link>
        </li>

        <li className="navbar-item">
          <Link to={"/settings"} className="navbar-link">
            <FontAwesomeIcon className="navbar-icon" icon={faGear} />
            <span className="navbar-text">Settings</span>
          </Link>
        </li>

        <li className="navbar-item">
          <Link to={"/profile"} className="navbar-link">
            <FontAwesomeIcon className="navbar-icon" icon={faUser} />
            <span className="navbar-text">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
