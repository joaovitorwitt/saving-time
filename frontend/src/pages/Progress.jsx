import Navbar from "../components/Navbar";
import { useTheme } from "../main";
import "../assets/styles/Progress.css";
// CHART JS DEPENDENCIES
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// FAKER DATA
import { faker } from "@faker-js/faker";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "../components/Notes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import WeeklyReport from "../components/WeeklyReport";

export default function Progress() {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Report",
      },
    },
  };

  // Display different daytimes here
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const data = {
    labels,
    datasets: [
      {
        label: "Hours",
        // get the day of the week that the user had the longest focus time and make it the max
        // alternatively get the day of the week that the user had the smallest focus time and make ut the min
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgb(101, 11, 204)",
      },
    ],
  };

  // greeting message on progress page
  const [username, setUsername] = useState("");
  const [totalFocus, setTotalFocus] = useState("");
  const [todaysFocus, setTodaysFocus] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  async function getUsernameFromDatabase(userId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/get/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      const theUser = data.user.username;
      setUsername(theUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  // this is getting called 4 times
  const hasFetchedTotalFocusTime = useRef(false);
  async function fetchTotalFocusTimeFromDatabase(userId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/get/total_focus/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      console.log(data);
      setTotalFocus(data.data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async function fetchDailyFocusFromDatabase(userId) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/get/daily/report/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network error");
      }
      const data = await response.json();
      setTodaysFocus(data.data);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.user_id) {
      if (hasFetchedTotalFocusTime.current === false) {
        getUsernameFromDatabase(currentUser.user_id);
        fetchTotalFocusTimeFromDatabase(currentUser.user_id);
        fetchDailyFocusFromDatabase(currentUser.user_id);
      }
    } else {
      console.log("You are not logged in");
      navigate("/login");
    }

    return () => {
      hasFetchedTotalFocusTime.current = true;
    };
  }, [currentUser, navigate]);

  return (
    <>
      <Navbar />
      <div className="progress-page" data-theme={currentTheme}>
        <div className="grid-container">
          <div className="graphic-card-1 grid-card">
            <h2>Hello, {username}</h2>
          </div>
          <div className="graphic-card-2 grid-card">
            <Line options={options} data={data} />
          </div>

          <div className="graphic-card-3 grid-card">
            {/* <Notes /> */}
            <WeeklyReport />
          </div>

          <div className="graphic-card-4 grid-card">
            <div className="grid-4-data-container">
              <FontAwesomeIcon icon={faClock} />
              <div className="grid-4-data">
                <h3>Total Focus</h3>
                <p>
                  {totalFocus} {totalFocus === 1 ? "hour" : "hours"}
                </p>
              </div>
            </div>

            <div className="grid-4-data-container">
              <FontAwesomeIcon icon={faCalendarDay} />
              <div className="grid-4-data">
                <h3>Today's Focus</h3>
                <p>
                  {todaysFocus} {todaysFocus === 1 ? "Hour" : "Hours"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
