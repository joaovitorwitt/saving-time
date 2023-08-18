import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">just focus</div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to={"/notes"}>Notes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
