import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Apartment Notifier</span>
          </Link>
        </div>

        <div className="navbar-menu">
          <ul className="navbar-list">
            <li>
              <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className={location.pathname === "/search" ? "active" : ""}>
                Search
              </Link>
            </li>
            <li>
              <Link to="/post" className={location.pathname === "/post" ? "active" : ""}>
                Post Vacancy
              </Link>
            </li>
          </ul>

          <div className="navbar-auth">
            <Link to="/login" className="btn-login">
              Log In
            </Link>
            <Link to="/signup" className="btn-signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
