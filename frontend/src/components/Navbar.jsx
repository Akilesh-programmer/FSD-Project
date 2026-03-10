import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate("/home")}>
        <div className="nav-cube">
          <span style={{ background: "#ff6b6b" }}></span>
          <span style={{ background: "#ffd93d" }}></span>
          <span style={{ background: "#6bcb77" }}></span>
          <span style={{ background: "#4d96ff" }}></span>
        </div>
        <h1 className="nav-title">CubeTimer</h1>
      </div>

      <div className="nav-links">
        <NavLink
          to="/home"
          end
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">⏱</span>
          <span className="nav-label">Timer</span>
        </NavLink>
        <NavLink
          to="/statistics"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">📊</span>
          <span className="nav-label">Stats</span>
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">🏆</span>
          <span className="nav-label">Leaderboard</span>
        </NavLink>
        <NavLink
          to="/algorithms"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">📖</span>
          <span className="nav-label">Algorithms</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-label">Profile</span>
        </NavLink>
      </div>

      <button onClick={handleLogout} className="nav-logout-btn">
        Sign Out
      </button>
    </nav>
  );
}

export default Navbar;
