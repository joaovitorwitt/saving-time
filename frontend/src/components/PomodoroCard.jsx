import { useEffect, useState } from "react";
import PomodoroBar from "./PomodoroBar";

export default function PomodoroCard() {
  const [buttonText, setButtonText] = useState("Start");
  const [timer, setTimer] = useState("25:00");
  const [seconds, setSeconds] = useState(25 * 60);
  const [timerInterval, setTimerInterval] = useState(null);

  const [resetButtonText, setResetButtonText] = useState("Reset");

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
    console.log("START POMODORO TIMER");
  }

  function pausePomodoroTimer() {
    // console.log("PAUSE POMODORO TIMER");
    // let currentAmountOfMinutes = (seconds / 60).toString().split(".")[0];
    // let currentAmountOfSeconds = (
    //   (seconds / 60 - parseInt(currentAmountOfMinutes)) *
    //   60
    // )
    //   .toString()
    //   .split(".")[0];
    // console.log(`MINUTES: ${currentAmountOfMinutes}`);
    // console.log(`SECONDS: ${currentAmountOfSeconds}`);
    // setSeconds(
    //   parseInt(currentAmountOfMinutes) * parseInt(currentAmountOfSeconds)
    // );
    // setTimer(`${currentAmountOfMinutes}:${currentAmountOfSeconds}`);
    clearInterval(timerInterval);
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

            <button onClick={resetPomodoroTimer} className="start-btn">
              {resetButtonText}
            </button>
          </div>
        </div>
        <PomodoroBar />
      </div>
    </section>
  );
}
