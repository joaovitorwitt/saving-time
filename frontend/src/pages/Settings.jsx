import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/styles/Settings.css";
import Button from "../components/Button";
import "../assets/styles/Settings.css";

import { useTheme } from "../main";

// Material UI library
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

// Color configuration Material UI library
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

export default function Settings() {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();

  const [pomodoroTimer, setPomodoroTimer] = useState(25);
  const [shortBreakTimer, setShortBreakTimer] = useState(5);

  // Material UI theme
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: "rgb(101, 11, 204)", // Color for thumb
      },
    },
  });

  function handleSubmitOfPomodoroSession(e) {
    e.preventDefault();
    const pomodoroSessionData = {
      pomodoroTimer,
      shortBreakTimer,
    };

    localStorage.setItem(
      "pomodoroSessionData",
      JSON.stringify(pomodoroSessionData)
    );

    navigate("/", { state: { pomodoroSessionData } });

    // clear the input fields
    setPomodoroTimer("");
    setShortBreakTimer("");
  }

  useEffect(() => {
    if (localStorage.getItem("userInfo") === null) {
      console.log("You are not logged in");
      navigate("/");
    }
  });

  return (
    <>
      <Navbar />
      <div className="settings-page" data-theme={currentTheme}>
        <div className="settings-form-wrapper">
          <div className="settings-form-data">
            <p>Adjust your pomodoro session according to your needs</p>
          </div>

          <form
            onSubmit={handleSubmitOfPomodoroSession}
            className="settings-form"
          >
            <div className="form-group">
              <label htmlFor="pomodoro">Pomodoro</label>
              <ThemeProvider theme={muiTheme}>
                <Slider
                  defaultValue={25}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e) => setPomodoroTimer(e.target.value)}
                  min={10}
                  max={90}
                />
              </ThemeProvider>
            </div>
            <div className="form-group" style={{ marginBottom: "1rem" }}>
              <label htmlFor="shortBreak">Short Break</label>
              <ThemeProvider theme={muiTheme}>
                <Slider
                  defaultValue={5}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e) => setShortBreakTimer(e.target.value)}
                  min={5}
                  max={40}
                />
              </ThemeProvider>
            </div>

            <Button textContent={"Set"} className={"btn"} />
          </form>
        </div>
      </div>
    </>
  );
}
