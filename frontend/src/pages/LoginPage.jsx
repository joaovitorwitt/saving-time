import "../assets/styles/LoginPage.css";
import Navbar from "../components/Navbar";
import { useTheme } from "../main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function LoginPage() {
  const navigate = useNavigate();

  const { currentTheme, toggleTheme } = useTheme();
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const passwordVisibilityIcon =
    passwordVisibility === "password" ? faEye : faEyeSlash;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
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
        navigate("/");
      } else {
        console.log(data);
        setErrorMessage(data.message);
        console.log(errorMessage);
      }
    } catch (error) {
      console.log("An error occured:", error);
      setErrorMessage("Something went wrong");
    }
  }

  function togglePasswordVisibility() {
    setPasswordVisibility((prevVisibility) =>
      prevVisibility === "password" ? "text" : "password"
    );
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
      <div className="login-page" data-theme={currentTheme}>
        <form onSubmit={handleLogin} className="login-form">
          <h3 className="register-page-cta">
            First time here?{" "}
            <Link className="register-page-link" to={"/register"}>
              create an account
            </Link>
          </h3>
          <div className="form-row">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              autoComplete={"off"}
              className="username-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              autoComplete={"off"}
              className="email-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
            <input
              autoComplete={"off"}
              type={passwordVisibility}
              placeholder="Password"
              name="password"
              value={password}
              className="password-input"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={passwordVisibilityIcon}
              className="show-password-icon-login"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="form-row">
            <input type="submit" value="Login" className="submit-input" />
          </div>
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        </form>
      </div>
    </>
  );
}
