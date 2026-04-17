import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatTime } from "../utils/format";
import "./Profile.css";

function Profile({ handleLogout, user, solves }) {
  const [cubeType, setCubeType] = useState("3x3");
  const [inspection, setInspection] = useState(false);
  const [inspectionTime, setInspectionTime] = useState(15);
  const navigate = useNavigate();

  const getBest = () => {
    if (solves.length === 0) return "—";
    return formatTime(Math.min(...solves.map((s) => s.time)));
  };

  const getMean = () => {
    if (solves.length === 0) return "—";
    return formatTime(solves.reduce((a, b) => a + b.time, 0) / solves.length);
  };

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="profile-page">
      <Navbar handleLogout={handleLogout} />
      <main className="profile-main">
        <div className="page-header">
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Your account and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-top">
            <div className="avatar-circle">
              <span>🧊</span>
            </div>
            <div className="profile-info">
              <h2>{user?.name || "Cuber"}</h2>
              <p className="profile-email">
                {user?.email || "cuber@cubetimer.com"}
              </p>
              <div className="profile-badges">
                <span className="badge">Speed Solver</span>
                <span className="badge accent">{cubeType} Main</span>
              </div>
            </div>
          </div>
          <div className="profile-summary">
            <div className="summary-item">
              <span className="summary-value">{solves.length}</span>
              <span className="summary-label">Total Solves</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{getBest()}</span>
              <span className="summary-label">Best Time</span>
            </div>
            <div className="summary-item">
              <span className="summary-value">{getMean()}</span>
              <span className="summary-label">Average</span>
            </div>
          </div>
        </div>

        {/* Timer Settings */}
        <div className="settings-section">
          <h2 className="section-title">Timer Settings</h2>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Puzzle Type</h3>
              <p>Select your puzzle for scramble generation</p>
            </div>
            <select
              value={cubeType}
              onChange={(e) => setCubeType(e.target.value)}
              className="setting-select"
            >
              <option value="2x2">2×2</option>
              <option value="3x3">3×3</option>
              <option value="4x4">4×4</option>
              <option value="5x5">5×5</option>
              <option value="pyraminx">Pyraminx</option>
              <option value="megaminx">Megaminx</option>
              <option value="skewb">Skewb</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h3>Inspection Time</h3>
              <p>Enable WCA-style 15s inspection period</p>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={inspection}
                onChange={(e) => setInspection(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {inspection && (
            <div className="setting-item">
              <div className="setting-info">
                <h3>Inspection Duration</h3>
                <p>Duration in seconds before timer starts</p>
              </div>
              <select
                value={inspectionTime}
                onChange={(e) => setInspectionTime(Number(e.target.value))}
                className="setting-select"
              >
                <option value={10}>10 seconds</option>
                <option value={15}>15 seconds (WCA)</option>
                <option value={20}>20 seconds</option>
                <option value={30}>30 seconds</option>
              </select>
            </div>
          )}
        </div>

        {/* About */}
        <div className="about-section">
          <h2 className="section-title">About CubeTimer</h2>
          <p className="about-text">
            A modern Rubik's Cube timer built for speedcubers. Track your
            solves, analyze performance trends, learn algorithms, and beat your
            records.
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-icon">⏱</span>
              <span className="feature-name">Precision Timer</span>
              <span className="feature-desc">Centisecond accuracy</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <span className="feature-name">Statistics</span>
              <span className="feature-desc">Ao5, Ao12, distributions</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🔀</span>
              <span className="feature-name">Scrambles</span>
              <span className="feature-desc">Random & stored scrambles</span>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📖</span>
              <span className="feature-name">Algorithms</span>
              <span className="feature-desc">OLL, PLL, F2L reference</span>
            </div>
          </div>
          <p className="app-version">CubeTimer v2.0.0</p>
        </div>

        {/* Account */}
        <div className="danger-section">
          <h2 className="section-title">Account</h2>
          <button className="danger-btn" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
