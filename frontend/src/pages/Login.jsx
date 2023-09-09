import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="login-message">
          <p>
            Login in. If you do not have an account, please{" "}
            <Link to="/register">Don't have an account?</Link>
          </p>
        </div>

        <div className="login-form-data">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
