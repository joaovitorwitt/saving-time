export default function SettingsForm() {
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="shortBreak">Short Break</label>
          <input
            type="number"
            className="form-control"
            id="shortBreak"
            placeholder="Short Break"
          />
        </div>
        <div className="form-group">
          <label htmlFor="longBreak">Long Break</label>
          <input
            type="number"
            className="form-control"
            id="longBreak"
            placeholder="Long Break"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rounds">Rounds</label>
          <input
            type="number"
            className="form-control"
            id="rounds"
            placeholder="Rounds"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
