import { useLocation } from "react-router-dom";
import PomodoroCard from "../components/PomodoroCard";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const location = useLocation();
  const pomodoroSessionData = location.state?.pomodoroSessionData || {};
  return (
    <>
      <Navbar />
      <PomodoroCard {...pomodoroSessionData} />
    </>
  );
}
