import { useLocation } from "react-router-dom";
import PomodoroCard from "../components/PomodoroCard";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

export default function HomePage() {
  console.log("HOMEPAGE RENDERED");
  const location = useLocation();
  const pomodoroSessionData = location.state?.pomodoroSessionData || {};
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  async function handleFocusInstanceCreation() {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/create/total_focus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: currentUser.user_id,
            overall_focus_time_hours: 0.0,
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
    } else {
      console.log("not logged");
    }
  });

  return (
    <>
      <Navbar />
      <PomodoroCard {...pomodoroSessionData} />
    </>
  );
}
