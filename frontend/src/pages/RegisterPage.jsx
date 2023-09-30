import Navbar from "../components/Navbar";
import { useTheme } from "../main";
import "../assets/styles/RegisterPage.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function RegisterPage() {
  console.log("REGISTER PAGE RENDERED");
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const passwordVisibilityIcon =
    passwordVisibility === "password" ? faEye : faEyeSlash;

  // auth tokens & user info feature
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [userInfo, setUserInfo] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  function togglePasswordVisibility() {
    setPasswordVisibility((prevVisibility) =>
      prevVisibility === "password" ? "text" : "password"
    );
  }

  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState("password");
  const confirmPasswordVisibilityIcon =
    confirmPasswordVisibility === "password" ? faEye : faEyeSlash;

  function toggleConfirmPasswordVisibility() {
    setConfirmPasswordVisibility((prevVisibility) =>
      prevVisibility === "password" ? "text" : "password"
    );
  }

  async function handleRegistration(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setAuthTokens(jwtDecode(data.access));
        console.log(data);
        console.log(jwtDecode(data.access));
        setUserInfo(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        localStorage.setItem(
          "userInfo",
          JSON.stringify(jwtDecode(data.access))
        );
        console.log("Successfully registered: ", data);
        navigate("/");
      } else {
        console.log(data);
        console.log("Failed to register: ", data);
        setErrorMessage(data.message);
        console.log(errorMessage);
      }
    } catch (error) {
      console.log("An error occurred: ", error);
      setErrorMessage(error);
      console.log(errorMessage);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <>
      <Navbar />
      <div className="register-page" data-theme={currentTheme}>
        <form onSubmit={handleRegistration} className="register-form">
          <h1>Register</h1>
          <h3 className="login-page-cta">
            Already have an account?{" "}
            <Link className="login-page-link" to={"/login"}>
              Log in
            </Link>
          </h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              className="username-input"
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              className="email-input"
            />
          </div>

          <div className="form-row">
            <input
              type={passwordVisibility}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              className="password-input"
            />
            <FontAwesomeIcon
              icon={passwordVisibilityIcon}
              className="show-password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>

          <div className="form-row">
            <input
              type={confirmPasswordVisibility}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              className="password-input"
            />
            <FontAwesomeIcon
              icon={confirmPasswordVisibilityIcon}
              className="show-confirm-password-icon"
              onClick={toggleConfirmPasswordVisibility}
            />
          </div>

          <div className="form-row">
            <input type="submit" className="submit-input" value={"Register"} />
          </div>

          <div className="error-message">{errorMessage}</div>
        </form>
      </div>
    </>
  );
}
