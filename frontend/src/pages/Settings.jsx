import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  function submitPomodoroSession(
    pomodoroTimer,
    shortBreakTimer
    // longBreakTimer,
    // pomodoroCount
  ) {
    console.log(`POMODORO TIMER: ${pomodoroTimer} minutes`);
    console.log(`SHORT BREAK TIMER: ${shortBreakTimer} minutes`);
    // console.log(`LONG BREAK TIMER: ${longBreakTimer} minutes`);
    // console.log(`POMODORO COUNT: ${pomodoroCount} sessions`);
  }

  const [pomodoroTimer, setPomodoroTimer] = useState("");
  const [shortBreakTimer, setShortBreakTimer] = useState("");
  // const [longBreakTimer, setLongBreakTimer] = useState("");
  // const [pomodoroCount, setPomodoroCount] = useState("");

  function handleSubmitOfPomodoroSession(e) {
    e.preventDefault();
    const pomodoroSessionData = {
      pomodoroTimer,
      shortBreakTimer,
      // longBreakTimer,
      // pomodoroCount,
    };

    // take the user to the homepage
    navigate("/", { state: { pomodoroSessionData } });

    // clear the input fields
    setPomodoroTimer("");
    setShortBreakTimer("");
    // setLongBreakTimer("");
    // setPomodoroCount("");
  }

  return (
    <div className="settings-wrapper">
      <Sidebar />
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
          <div className="form-group">
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
          {/* <div className="form-group">
            <label htmlFor="longBreak">Long Break</label>
            <input
              type="number"
              className="form-control"
              id="longBreak"
              placeholder="Long Break"
              value={longBreakTimer}
              onChange={(e) => setLongBreakTimer(e.target.value)}
            />
          </div> */}
          {/* <div className="form-group">
            <label htmlFor="rounds">Rounds</label>
            <input
              type="number"
              className="form-control"
              id="rounds"
              placeholder="Rounds"
              value={pomodoroCount}
              onChange={(e) => setPomodoroCount(e.target.value)}
            />
          </div> */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
