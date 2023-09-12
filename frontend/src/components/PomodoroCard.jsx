import { useEffect, useState } from "react";
import startSound from "../assets/sounds/start.wav";
import pauseSound from "../assets/sounds/pause.wav";
import resetSound from "../assets/sounds/reset.wav";

export default function PomodoroCard({
  pomodoroTimer = 25,
  shortBreakTimer = 5,
  longBreakTimer = 15,
  pomodoroCount = 4,
}) {
  // change button text from "Start" to "Pause"
  const [buttonText, setButtonText] = useState("Start");

  // automatically starts pomodoro timer
  const [autostartPomodoroTimer, setAutostartPomodoroTimer] = useState(false);

  const [seconds, setSeconds] = useState(parseInt(pomodoroTimer) * 60);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

  // set current pomodoro session based on timer
  const [currentSession, setCurrentSession] = useState("Pomodoro");
  const [pomodoroSessionCount, setPomodoroSessionCount] = useState(1);

  useEffect(() => {
    if (seconds <= 0) {
      console.log("CURRENT TIMER ENDED");
      clearInterval(timerInterval);
      setButtonText("Start");

      // When a Pomodoro session ends, check if it's time for a break or long break
      if (currentSession === "Pomodoro") {
        setPomodoroSessionCount((prevCount) => prevCount + 1);
        if (pomodoroSessionCount === pomodoroCount) {
          setCurrentSession("Long Break");
          setSeconds(parseInt(longBreakTimer) * 60);
        } else {
          setCurrentSession("Short Break");
          setSeconds(parseInt(shortBreakTimer) * 60);
          startTimer();
        }
      } else {
        setCurrentSession("Pomodoro");
        setSeconds(parseInt(pomodoroTimer) * 60);
      }
    }
  }, [
    seconds,
    timerInterval,
    currentSession,
    longBreakTimer,
    pomodoroSessionCount,
    pomodoroTimer,
    shortBreakTimer,
  ]);

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
    playPauseSound();
    console.log("TIMER PAUSED");
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setButtonText("Start");
    setIsPomodoroRunning(false);

    if (currentSession === "Pomodoro") {
      setSeconds(parseInt(pomodoroTimer) * 60);
    } else if (currentSession === "Short Break") {
      setSeconds(parseInt(shortBreakTimer) * 60);
    } else if (currentSession === "Long Break") {
      setSeconds(parseInt(longBreakTimer) * 60);
    }
    playResetSound();
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
    <section className="pomodoro-card">
      <div className="container">
        <p>Session: {currentSession}</p>
        <div className="card-data">
          <h1 className="timer">{formatTime(seconds)}</h1>
          <div className="buttons-wrapper">
            <button onClick={changeButtonText} className="btn start-btn">
              {buttonText}
            </button>
            <button onClick={resetTimer} className="btn reset-btn">
              Reset
            </button>
          </div>
        </div>
        <div className="display-current-config">
          {/* <div className="current-config-row">
            <div className="current-config-label">Current Session:</div>
            <div className="current-config-value">{currentSession}</div>
          </div>
          <div className="current-config-row">
            <div className="current-config-label">Pomodoro Timer:</div>
            <div className="current-config-value">
              {formatTime(parseInt(pomodoroTimer) * 60)}
            </div>
          </div>
          <div className="current-config-row">
            <div className="current-config-label">Short Break Timer:</div>
            <div className="current-config-value">
              {formatTime(parseInt(shortBreakTimer) * 60)}
            </div>
          </div>
          <div className="current-config-row">
            <div className="current-config-label">Long Break Timer:</div>
            <div className="current-config-value">
              {formatTime(parseInt(longBreakTimer) * 60)}
            </div>
          </div> 
          <div className="current-config-row">
            <div className="current-config-label">Pomodoro Session:</div>
            <div className="current-config-value">{`${pomodoroSessionCount} of ${pomodoroCount}`}</div>
  </div> */}
        </div>
      </div>
    </section>
  );
}
