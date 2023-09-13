import { Link } from "react-router-dom";
import "../assets/styles/ErrorPage.css";

export default function ErrorPage() {
  return (
    <div className="container">
      <div className="not-found-wrapper">
        <h1>Page not found</h1>
        <p className="not-found-warning">
          The page you are looking for does not exist.
        </p>
        <Link to={"/"}>
          <button className="btn btn-primary btn-lg">Back to home</button>
        </Link>
      </div>
    </div>
  );
}
