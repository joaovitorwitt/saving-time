import Navbar from "../components/Navbar";
import { useTheme } from "../main";
import "../assets/styles/Profile.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const actualUser = localStorage.getItem("userInfo");
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (actualUser === null) {
      console.log("You are not logged in");
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(actualUser);
      if (parsedUser && parsedUser.user_id) {
        setUserId(parsedUser.user_id);
        // Now you can use userId
      } else {
        console.log("User information is incomplete.");
      }
    }
  }, [actualUser]);

  // Changing password feature
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Change username feature
  const [newUsername, setNewUsername] = useState("");
  const [confirmPasswordForUsername, setConfirmPasswordForUsername] =
    useState("");

  // Delete account feature
  const [validateUsername, setValidateUsername] = useState("");
  const [validatePassword, setValidatePassword] = useState("");
  const [validateDeleteString, setValidateDeleteString] = useState("");
  const [deleteEndpointCall, setDeleteEndpointCall] = useState(false);

  // Open/close modal feature
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Response return value
  const [responseStringFromUsername, setResponseStringFromUsername] =
    useState("");
  const [responseStringFromPassword, setResponseStringFromPassword] =
    useState("");

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

      if (data.status === "success") {
        navigate("/");
      } else {
        setNewUsername("");
        setConfirmPasswordForUsername("");
        setResponseStringFromUsername(data.message);
      }
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
      if (data.status === "success") {
        navigate("/");
      } else {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setResponseStringFromPassword(data.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function validatingDataForAccountDeletion(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/delete/account/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: validateUsername,
            password: validatePassword,
            delete_string: validateDeleteString,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.message === "delete method called") {
        // call delete endpoint method
        setDeleteEndpointCall(true);
        deleteUserAccountAfterValidation();
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function deleteUserAccountAfterValidation() {
    // event.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/delete/user/${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.message === "user deleted successfully") {
        localStorage.removeItem("userInfo");
        navigate("/");
      }
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

  useEffect(() => {
    if (responseStringFromPassword || responseStringFromUsername) {
      const timer = setTimeout(() => {
        setResponseStringFromPassword("");
        setResponseStringFromUsername("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [responseStringFromPassword, responseStringFromUsername]);

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
          <div className="error-message">
            <p>{responseStringFromPassword}</p>
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
          <div className="error-message">
            <p>{responseStringFromUsername}</p>
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
                  <p>Are You Sure?</p>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={toggleModalVisibility}
                    className="close-modal-btn"
                  />
                </div>
                <form
                  className="delete-account-form"
                  onSubmit={validatingDataForAccountDeletion}
                >
                  <div className="input-row-delete">
                    <input
                      type="text"
                      placeholder="Current username"
                      value={validateUsername}
                      onChange={(e) => setValidateUsername(e.target.value)}
                    />
                  </div>
                  <div className="input-row-delete">
                    <input
                      type="text"
                      placeholder="Please, type 'delete'"
                      value={validateDeleteString}
                      onChange={(e) => setValidateDeleteString(e.target.value)}
                    />
                  </div>
                  <div className="input-row-delete">
                    <input
                      type="password"
                      placeholder="Current password"
                      value={validatePassword}
                      onChange={(e) => setValidatePassword(e.target.value)}
                    />
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
