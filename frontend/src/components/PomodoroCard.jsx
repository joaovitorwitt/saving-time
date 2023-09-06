import { useEffect, useState } from "react";
import PomodoroBar from "./PomodoroBar";

export default function PomodoroCard({
  pomodoroTimer,
  shortBreakTimer,
  longBreakTimer,
  pomodoroCount,
}) {
  const [buttonText, setButtonText] = useState("Start");
  const [seconds, setSeconds] = useState(parseInt(pomodoroTimer) * 60); // ==> 1500 seconds
  const [timerInterval, setTimerInterval] = useState(null);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timerInterval);
      setButtonText("Start");
    }
  }, [seconds, timerInterval]);

  function changeButtonText() {
    if (buttonText === "Start") {
      setButtonText("Pause");
      startPomodoroTimer();
    } else {
      setButtonText("Start");
      pausePomodoroTimer();
    }
  }

  function startPomodoroTimer() {
    setTimerInterval(
      setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000)
    );
    setIsPomodoroRunning(true);
  }

  function pausePomodoroTimer() {
    clearInterval(timerInterval);
  }

  function resetPomodoroTimer() {
    clearInterval(timerInterval);
    setSeconds(parseInt(pomodoroTimer * 60));
    setIsPomodoroRunning(false);
    setButtonText("Start");
  }

  function formatTime(seconds) {
    if (isNaN(seconds)) {
      setSeconds(25 * 60);
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <section className="pomodoro-card">
      <div className="container">
        <div className="card-data">
          <h1 className="timer">{formatTime(seconds)}</h1>
          <div className="buttons-wrapper">
            <button onClick={changeButtonText} className="btn start-btn">
              {buttonText}
            </button>

            {isPomodoroRunning && (
              <button onClick={resetPomodoroTimer} className="btn reset-btn">
                Reset
              </button>
            )}
          </div>
        </div>
        {/* <div className="stuff">
          {pomodoroTimer} ||
          {shortBreakTimer} ||
          {longBreakTimer} ||
          {pomodoroCount} ||
        </div> */}
        {/* <PomodoroBar /> */}
      </div>
    </section>
  );
}
