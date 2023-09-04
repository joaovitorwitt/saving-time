import SettingsForm from "../components/SettingsForm";
import Sidebar from "../components/Sidebar";

export default function Settings() {
  return (
    <div className="settings-wrapper">
      <Sidebar />
      <SettingsForm />
    </div>
  );
}
