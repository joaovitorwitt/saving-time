import { useState } from "react";

export default function PomodoroBar() {
  const [valueToFillBar, setValueToFillBar] = useState(0);

  function updateBarWidth() {
    // this total seconds should come from the pomodoro timer that the user will set
    let totalSeconds = 1500;
    let barWidth = 500;
    setInterval(() => {
      setValueToFillBar((prevWidth) => prevWidth + barWidth / totalSeconds);
    }, 1000);
    console.log(valueToFillBar);
  }

  return (
    <>
      <div className="pomodoro-bar-wrapper">
        <div className="bar" style={{ width: valueToFillBar }}></div>
      </div>
      <button onClick={updateBarWidth}>click</button>
    </>
  );
}
