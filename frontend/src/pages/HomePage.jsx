import Header from "../components/Header";
import PomodoroCard from "../components/PomodoroCard";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  return (
    <div className="grid-container">
      <Sidebar />
      <PomodoroCard />
    </div>
  );
}
