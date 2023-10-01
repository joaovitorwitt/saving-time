import { useLocation } from "react-router-dom";
import PomodoroCard from "../components/PomodoroCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function HomePage() {
  console.log("HOMEPAGE RENDERED");
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  function getCurrentDayOfTheWeek() {
    let date = new Date().getDay();
    switch (date) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Something went wrong";
    }
  }

  function getCurrentDateFormatted() {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getCurrentWeekNumber() {
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
    let weekNumber = Math.ceil(days / 7);

    return weekNumber;
  }

  let currentDayOfTheWeek = getCurrentDayOfTheWeek();
  let currentDate = getCurrentDateFormatted();
  let currentWeekNumber = getCurrentWeekNumber();

  async function handleFocusInstanceCreation() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/create/focus_instance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: currentUser.user_id,
            focus_time: 0.0,
            day_of_the_week: currentDayOfTheWeek,
            date: currentDate,
            week_number: currentWeekNumber,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (currentUser && currentUser.user_id) {
      handleFocusInstanceCreation();
      localStorage.getItem("pomodoroSessionData");
      console.log("Focus Instance creation called");
    } else {
      console.log("not logged");
    }
  });

  return (
    <>
      <Navbar />
      <PomodoroCard />
    </>
  );
}
