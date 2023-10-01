import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faChartColumn,
  faUser,
  faGear,
  faHome,
  faSun,
  faMoon,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import "../assets/styles/Navbar.css";
import { useTheme } from "../main";
import jwtDecode from "jwt-decode";

export default function Navbar() {
  const { currentTheme, toggleTheme } = useTheme();
  const iconThemeIcon = currentTheme === "dark" ? faSun : faMoon;

  // if there is the local storage value with the user info
  // we want to set isLoggedIn to true

  const isLoggedIn = localStorage.getItem("userInfo") ? true : false;

  function logoutUser() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("pomodoroSessionData");
  }

  return (
    <nav className="navbar" data-theme={currentTheme}>
      <ul className="navbar-nav">
        <li className="navbar-item">
          <Link to={"/"} className="navbar-link">
            <FontAwesomeIcon className="navbar-icon" icon={faHome} />
            <span className="navbar-text">Home</span>
          </Link>
        </li>

        {isLoggedIn ? (
          <>
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

            <li className="navbar-item">
              <Link to={"/login"} className="navbar-link" onClick={logoutUser}>
                <FontAwesomeIcon
                  className="navbar-icon"
                  icon={faRightToBracket}
                />
                <span className="navbar-text">Logout</span>
              </Link>
            </li>
          </>
        ) : (
          <li className="navbar-item">
            <Link to={"/login"} className="navbar-link">
              <FontAwesomeIcon
                className="navbar-icon"
                icon={faRightToBracket}
              />
              <span className="navbar-text">Login</span>
            </Link>
          </li>
        )}

        <li className="navbar-item">
          <Link className="navbar-link" onClick={toggleTheme}>
            <FontAwesomeIcon className="navbar-icon" icon={iconThemeIcon} />
            <span className="navbar-text">Theme</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
