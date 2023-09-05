import { useState } from "react";

export default function SettingsForm({ submitPomodoroSession }) {
  const [pomodoroTimer, setPomodoroTimer] = useState("");
  const [shortBreakTimer, setShortBreakTimer] = useState("");
  const [longBreakTimer, setLongBreakTimer] = useState("");
  const [pomodoroCount, setPomodoroCount] = useState("");

  function handleSubmitOfPomodoroSession() {
    submitPomodoroSession(
      pomodoroTimer,
      shortBreakTimer,
      longBreakTimer,
      pomodoroCount
    );
  }

  return (
    <div className="settings-form-wrapper">
      <div className="settings-form-data">
        <h1>Settings</h1>
        <p>here you can adjust your pomodoro session according to your needs</p>
      </div>

      <form action="" className="settings-form">
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
        <div className="form-group">
          <label htmlFor="longBreak">Long Break</label>
          <input
            type="number"
            className="form-control"
            id="longBreak"
            placeholder="Long Break"
            value={longBreakTimer}
            onChange={(e) => setLongBreakTimer(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rounds">Rounds</label>
          <input
            type="number"
            className="form-control"
            id="rounds"
            placeholder="Rounds"
            value={pomodoroCount}
            onChange={(e) => setPomodoroCount(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onSubmit={handleSubmitOfPomodoroSession}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
