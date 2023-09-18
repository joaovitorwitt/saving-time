import { useEffect, useState } from "react";
import startSound from "../assets/sounds/start.wav";
import pauseSound from "../assets/sounds/pause.wav";
import resetSound from "../assets/sounds/reset.wav";
import endSound from "../assets/sounds/end.wav";
import Button from "./Button";
import "../assets/styles/PomodoroCard.css";
import { useTheme } from "../main";

export default function PomodoroCard({
  pomodoroTimer = 25,
  shortBreakTimer = 5,
}) {
  const { currentTheme, toggleTheme } = useTheme();

  const [buttonText, setButtonText] = useState("Start");
  const [seconds, setSeconds] = useState(parseInt(pomodoroTimer) * 60);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

  // set current pomodoro session based on timer
  const [currentSession, setCurrentSession] = useState("Pomodoro");

  useEffect(() => {
    if (seconds <= 0 && currentSession === "Pomodoro") {
      console.log("CURRENT TIMER ENDED");
      setCurrentSession("Short Break");
      clearInterval(timerInterval);
      setButtonText("Start");
      setSeconds(parseInt(shortBreakTimer) * 60);
      playEndSound();
    } else if (seconds <= 0 && currentSession === "Short Break") {
      setCurrentSession("Pomodoro");
      clearInterval(timerInterval);
      setButtonText("Start");
      setSeconds(parseInt(pomodoroTimer) * 60);
      playEndSound();
    }
  }, [seconds, timerInterval, currentSession, pomodoroTimer, shortBreakTimer]);

  function playStartSound() {
    const audio = new Audio(startSound);
    audio.play();
  }

  function playPauseSound() {
    const audio = new Audio(pauseSound);
    audio.play();
  }

  function playResetSound() {
    const audio = new Audio(resetSound);
    audio.play();
  }

  function playEndSound() {
    const audio = new Audio(endSound);
    audio.play();
  }

  function changeButtonText() {
    if (buttonText === "Start") {
      setButtonText("Pause");
      startTimer();
    } else {
      setButtonText("Start");
      pauseTimer();
    }
  }

  function startTimer() {
    setTimerInterval(
      setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000)
    );
    setIsPomodoroRunning(true);
    // playStartSound();
    console.log("TIMER STARTED");
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    setIsPomodoroRunning(false);
    // playPauseSound();
    console.log("TIMER PAUSED");
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setButtonText("Start");
    setIsPomodoroRunning(false);

    if (currentSession === "Pomodoro") {
      setSeconds(parseInt(pomodoroTimer) * 60);
    } else {
      setSeconds(parseInt(shortBreakTimer) * 60);
    }
    // playResetSound();
    console.log("TIMER RESET");
  }

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <section className="pomodoro-card" data-theme={currentTheme}>
      <div className="container">
        <p>Session: {currentSession}</p>
        <div className="card-data">
          <h1 className="timer">{formatTime(seconds)}</h1>
          <div className="buttons-wrapper">
            <Button
              onClick={changeButtonText}
              className={"btn"}
              textContent={buttonText}
            />

            <Button
              onClick={resetTimer}
              className={"btn"}
              textContent={"Reset"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
