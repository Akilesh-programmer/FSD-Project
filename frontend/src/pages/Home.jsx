import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ setIsAuthenticated }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [solves, setSolves] = useState([]);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!isRunning) {
          // Start timer
          setTime(0);
          setIsRunning(true);
        } else {
          // Stop timer and save solve
          setIsRunning(false);
          const newSolve = {
            id: Date.now(),
            time: time,
            timestamp: new Date().toLocaleString(),
          };
          setSolves((prev) => [newSolve, ...prev]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isRunning, time]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  const deleteSolve = (id) => {
    setSolves((prev) => prev.filter((solve) => solve.id !== id));
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const getAverage = (count) => {
    if (solves.length < count) return "N/A";
    const times = solves.slice(0, count).map((s) => s.time);
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    return formatTime(avg);
  };

  const getBest = () => {
    if (solves.length === 0) return "N/A";
    const best = Math.min(...solves.map((s) => s.time));
    return formatTime(best);
  };

  return (
    <div className="home-container">
      <header>
        <h1>Rubik's Cube Timer</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </header>

      <div className="timer-section">
        <div className="timer-display">{formatTime(time)}</div>
        <p className="timer-instruction">
          Press <strong>SPACEBAR</strong> to {isRunning ? "stop" : "start"}{" "}
          timer
        </p>
      </div>

      <div className="stats-section">
        <h2>Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Solves</div>
            <div className="stat-value">{solves.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Best Time</div>
            <div className="stat-value">{getBest()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg of 5</div>
            <div className="stat-value">{getAverage(5)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg of 12</div>
            <div className="stat-value">{getAverage(12)}</div>
          </div>
        </div>
      </div>

      <div className="solves-section">
        <h2>Recent Solves</h2>
        {solves.length === 0 ? (
          <p className="no-solves">No solves yet. Press spacebar to start!</p>
        ) : (
          <div className="solves-list">
            {solves.map((solve, index) => (
              <div key={solve.id} className="solve-item">
                <span className="solve-number">{index + 1}.</span>
                <span className="solve-time">{formatTime(solve.time)}</span>
                <span className="solve-date">{solve.timestamp}</span>
                <button
                  onClick={() => deleteSolve(solve.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
