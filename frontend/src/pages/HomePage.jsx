import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import PomodoroCard from "../components/PomodoroCard";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  const location = useLocation();
  const pomodoroSessionData = location.state?.pomodoroSessionData || {};
  return (
    <div className="grid-container">
      <Header />
      <PomodoroCard {...pomodoroSessionData} />
    </div>
  );
}
