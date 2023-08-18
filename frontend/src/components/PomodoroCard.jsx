import { useEffect, useState } from "react";

export default function PomodoroCard() {
  const [buttonText, setButtonText] = useState("Start");
  const [timer, setTimer] = useState("25:00");
  const [seconds, setSeconds] = useState(25 * 60);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timerInterval);
      setButtonText("Start");
    }
  }, [seconds, timerInterval]);

  function changeButtonText() {
    if (buttonText === "Start") {
      setButtonText("Reset");
      startPomodoroTimer();
    } else {
      setButtonText("Start");
      resetPomodoroTimer();
    }
  }

  function startPomodoroTimer() {
    setTimerInterval(
      setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000)
    );
    console.log("START POMODORO TIMER");
  }

  function resetPomodoroTimer() {
    clearInterval(timerInterval);
    setSeconds(25 * 60);
    setTimer("25:00");
    console.log("RESET POMODORO TIMER");
  }

  function formatTime(seconds) {
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
            <button onClick={changeButtonText} className="start-btn">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
