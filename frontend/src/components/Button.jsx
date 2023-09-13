import "../assets/styles/Button.css";

export default function Button({
  onClick,
  className,
  textContent,
  additionalStyle,
}) {
  return (
    <div className="button-container">
      <button className={className} onClick={onClick}>
        {textContent}
      </button>
    </div>
  );
}
