import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/styles/Settings.css";
import Button from "../components/Button";
import "../assets/styles/Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  const [pomodoroTimer, setPomodoroTimer] = useState("");
  const [shortBreakTimer, setShortBreakTimer] = useState("");

  function handleSubmitOfPomodoroSession(e) {
    e.preventDefault();
    const pomodoroSessionData = {
      pomodoroTimer,
      shortBreakTimer,
    };

    navigate("/", { state: { pomodoroSessionData } });

    // clear the input fields
    setPomodoroTimer("");
    setShortBreakTimer("");
  }

  useEffect(() => {
    if (localStorage.getItem("userInfo") === null) {
      console.log("You are not logged in");
      navigate("/");
    }
  });

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="settings-form-wrapper">
          <div className="settings-form-data">
            <h1>Settings</h1>
            <p>
              here you can adjust your pomodoro session according to your needs
            </p>
          </div>

          <form
            onSubmit={handleSubmitOfPomodoroSession}
            className="settings-form"
          >
            <div className="form-group">
              <label htmlFor="pomodoro">Pomodoro</label>
              <input
                type="number"
                className="form-control"
                id="pomodoro"
                placeholder="Pomodoro"
                value={pomodoroTimer}
                onChange={(e) => setPomodoroTimer(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label htmlFor="shortBreak">Short Break</label>
              <input
                type="number"
                className="form-control"
                id="shortBreak"
                placeholder="Short Break"
                value={shortBreakTimer}
                onChange={(e) => setShortBreakTimer(e.target.value)}
              />
            </div>

            <Button textContent={"Submit"} className={"btn"} />
          </form>
        </div>
      </div>
    </>
  );
}
