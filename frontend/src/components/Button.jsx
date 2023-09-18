import "../assets/styles/Button.css";
import { useTheme } from "../main";

export default function Button({ onClick, className, textContent }) {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <div className="button-container" data-theme={currentTheme}>
      <button className={className} onClick={onClick}>
        {textContent}
      </button>
    </div>
  );
}
