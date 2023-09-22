import Navbar from "../components/Navbar";
import { useTheme } from "../main";
import "../assets/styles/Profile.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { currentTheme } = useTheme();
  const userId = JSON.parse(localStorage.getItem("userInfo"))["user_id"];

  // Changing password feature
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Change username feature
  const [newUsername, setNewUsername] = useState("");
  const [confirmPasswordForUsername, setConfirmPasswordForUsername] =
    useState("");

  // Open/close modal feature
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Response return value
  const [responseString, setResponseString] = useState("");

  async function handleUsernameChange(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/update/username/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: newUsername,
            password: confirmPasswordForUsername,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function handlePasswordChange(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/update/password/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: currentPassword,
            new_password: newPassword,
            confirm_new_password: confirmNewPassword,
          }),
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  function toggleModalVisibility(e) {
    setIsModalOpen((prevModal) => (prevModal === false ? true : false));
    if (
      isModalOpen === true &&
      e.target.id !== "modal" &&
      e.target.id === "modal-bg"
    ) {
      console.log(e.target.id);
      setIsModalOpen(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="profile-page" data-theme={currentTheme}>
        <form onSubmit={handlePasswordChange} className="change-password-form">
          <h3>Change Password</h3>
          <div className="input-row">
            <input
              type="password"
              placeholder="Old password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>

          <div className="input-row">
            <input
              type="submit"
              value={"Change Password"}
              className="submit-input"
            />
          </div>
        </form>

        {/* //////////////////////////////////////////////////////////////// */}

        <form onSubmit={handleUsernameChange} className="change-username-form">
          <h3>Change Username</h3>
          <div className="input-row">
            <input
              type="text"
              placeholder="New username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>

          <div className="input-row">
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPasswordForUsername}
              onChange={(e) => setConfirmPasswordForUsername(e.target.value)}
            />
          </div>

          <div className="input-row">
            <input
              type="submit"
              value={"Change username"}
              className="submit-input"
            />
          </div>
        </form>

        {/* //////////////////////////////////////////////////////////////// */}

        <div className="delete-account-data">
          <h3>Delete Account</h3>
          <p>Once you delete your account, there is no turning back.</p>
          <button
            className="open-delete-modal-btn"
            onClick={toggleModalVisibility}
          >
            Delete Account
          </button>
        </div>

        {isModalOpen && (
          <div
            className="delete-account-background"
            onClick={toggleModalVisibility}
            id="modal-bg"
          >
            <div
              className="delete-account-modal"
              id="modal"
              onClick={toggleModalVisibility}
            >
              <div className="delete-modal-content">
                <div className="modal-header">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={toggleModalVisibility}
                    className="close-modal-btn"
                  />
                </div>
                <form className="delete-account-form">
                  <div className="input-row-delete">
                    <input type="text" placeholder="Current username" />
                  </div>
                  <div className="input-row-delete">
                    <input type="text" placeholder="Please, type 'delete'" />
                  </div>
                  <div className="input-row-delete">
                    <input type="password" placeholder="Current password" />
                  </div>
                  <div className="input-row-delete">
                    <input
                      type="submit"
                      value={"I understand the consequences"}
                      className="delete-account-btn"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* //////////////////////////////////////////////////////////////// */}
      </div>
    </>
  );
}
