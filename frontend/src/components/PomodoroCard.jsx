import { useEffect, useState } from "react";
import startSound from "../assets/sounds/start.wav";
import pauseSound from "../assets/sounds/pause.wav";
import resetSound from "../assets/sounds/reset.wav";
import endSound from "../assets/sounds/end.wav";
import Button from "./Button";
import "../assets/styles/PomodoroCard.css";
import { useTheme } from "../main";

export default function PomodoroCard() {
  const { currentTheme } = useTheme();

  const pomodoroTimer = useState(
    JSON.parse(localStorage.getItem("pomodoroSessionData"))
      ? JSON.parse(localStorage.getItem("pomodoroSessionData")).pomodoroTimer
      : 25
  );

  const shortBreakTimer = useState(
    JSON.parse(localStorage.getItem("pomodoroSessionData"))
      ? JSON.parse(localStorage.getItem("pomodoroSessionData")).shortBreakTimer
      : 5
  );

  const [buttonText, setButtonText] = useState("Start");
  const [seconds, setSeconds] = useState(parseInt(pomodoroTimer[0]) * 60);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);

  // set current pomodoro session based on timer
  const [currentSession, setCurrentSession] = useState("Pomodoro");

  // set username for current session
  const [username, setUsername] = useState("");

  // set greeting state for current session
  const [greeting, setGreeting] = useState("");

  // feature for updating total focus time
  let timePaused;
  const [initialFocus, setInitialFocus] = useState(pomodoroTimer[0] * 60);

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
    console.log("TIMER PAUSED");
    setInitialFocus(seconds);
    timePaused = seconds;
    let totalFocus = calculateCurrentFocusTime(initialFocus, timePaused);
    console.log(totalFocus);
    // SEND UPDATE TOTAL FOCUS REQUEST HERE???
    updateTotalFocusTime(totalFocus);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    setButtonText("Start");
    setIsPomodoroRunning(false);
    setInitialFocus(pomodoroTimer[0] * 60);
    if (currentSession === "Pomodoro") {
      setSeconds(parseInt(pomodoroTimer) * 60);
    } else {
      setSeconds(parseInt(shortBreakTimer) * 60);
    }
    // playResetSound();
    console.log("TIMER RESET");
  }

  let currentUser = localStorage.getItem("userInfo")
    ? localStorage.getItem("userInfo")
    : null;

  let currentUserID = JSON.parse(currentUser);

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  // effect state to greet the user based on the current hour of the day
  useEffect(() => {
    const currentHours = new Date().getHours();

    if (currentHours >= 4 && currentHours < 12) {
      setGreeting(`Good Morning, ${username}`);
    } else if (currentHours >= 12 && currentHours < 18) {
      setGreeting(`Good Afternoon, ${username}`);
    } else {
      setGreeting(`Good Night, ${username}`);
    }
  });

  async function getUserInformationFromDatabase(userId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/get/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();

      console.log(data);
      const theUser = data.user.username;
      console.log(theUser);

      setUsername(theUser);
    } catch (error) {
      console.error("Failed to get user information: ", error);
    }
  }

  // TODO: finish this request
  async function updateTotalFocusTime(totalFocus) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/update/total_focus/${currentUserID.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            focus_time: parseFloat(totalFocus),
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  function calculateCurrentFocusTime(initialFocus, timePaused) {
    // store inital focus & time paused
    let holdInitialFocus = initialFocus;
    let holdTimePaused = timePaused;

    // perform calculation
    let valueToApi = holdInitialFocus - holdTimePaused;

    console.log(`INITIAL FOCUS IS: ${holdInitialFocus}`);
    console.log(`TIME PAUSED: ${holdTimePaused}`);
    console.log(`TOTAL FOCUS TIME: ${valueToApi}`);
    // convert to hours before sending to the database
    // this is in minutes right now
    return (valueToApi / 60).toFixed(2);
  }

  useEffect(() => {
    if (currentUser === null) {
      console.log("CURRENT USER IS NULL");
      setUsername("Stranger");
      const pomodoroSessionData = {
        pomodoroTimer: 25,
        shortBreakTimer: 5,
      };

      localStorage.setItem(
        "pomodoroSessionData",
        JSON.stringify(pomodoroSessionData)
      );
    } else {
      getUserInformationFromDatabase(currentUserID.user_id);
    }
  }, []);

  return (
    <section className="pomodoro-card" data-theme={currentTheme}>
      <h1 className="user-greet-message">{greeting}</h1>
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
