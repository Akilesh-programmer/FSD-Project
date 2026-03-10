import { useState, useEffect, useRef } from "react";
import { generateScramble } from "../utils/scramble";
import { formatTime } from "../utils/format";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home({ setIsAuthenticated, solves, setSolves }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [scramble, setScramble] = useState(() => generateScramble());
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [toast, setToast] = useState(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const isRunningRef = useRef(false);
  const spaceHeldRef = useRef(false);
  const timeRef = useRef(0);
  const scrambleRef = useRef(scramble);
  const toastTimeout = useRef(null);

  // Keep refs in sync
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);
  useEffect(() => {
    scrambleRef.current = scramble;
  }, [scramble]);

  const showToast = (message, type = "info") => {
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    setToast({ message, type });
    toastTimeout.current = setTimeout(() => setToast(null), 3000);
  };

  // Get effective time accounting for penalties
  const getEffectiveTime = (solve) => {
    if (solve.penalty === "dnf") return Infinity;
    if (solve.penalty === "+2") return solve.time + 2000;
    return solve.time;
  };

  // Format with penalty display
  const formatSolveTime = (solve) => {
    if (solve.penalty === "dnf") return "DNF";
    if (solve.penalty === "+2") return formatTime(solve.time + 2000) + "+";
    return formatTime(solve.time);
  };

  // Check if this solve is a new PB
  const checkPB = (newTime, existingSolves) => {
    if (existingSolves.length === 0) return true;
    const validSolves = existingSolves.filter((s) => s.penalty !== "dnf");
    if (validSolves.length === 0) return true;
    const currentBest = Math.min(
      ...validSolves.map((s) => getEffectiveTime(s)),
    );
    return newTime < currentBest;
  };

  // Timer interval
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        timeRef.current = elapsed;
        setTime(elapsed);
      }, 10);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        if (isRunningRef.current) {
          const finalTime = Date.now() - startTimeRef.current;
          timeRef.current = finalTime;
          setTime(finalTime);
          isRunningRef.current = false;
          setIsRunning(false);
          const isPB = checkPB(finalTime, solves);
          const newSolve = {
            id: Date.now(),
            time: finalTime,
            scramble: scrambleRef.current,
            timestamp: new Date().toLocaleString(),
            penalty: null,
          };
          setSolves((prev) => [newSolve, ...prev]);
          if (isPB) {
            showToast(`🎉 New Personal Best! ${formatTime(finalTime)}`, "pb");
          }
          const next = generateScramble();
          scrambleRef.current = next;
          setScramble(next);
        } else {
          spaceHeldRef.current = true;
          setSpaceHeld(true);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (spaceHeldRef.current && !isRunningRef.current) {
          setTime(0);
          timeRef.current = 0;
          isRunningRef.current = true;
          setIsRunning(true);
        }
        spaceHeldRef.current = false;
        setSpaceHeld(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [setSolves, solves]);

  const handleTimerClick = () => {
    if (isRunning) {
      const finalTime = Date.now() - startTimeRef.current;
      setTime(finalTime);
      setIsRunning(false);
      const isPB = checkPB(finalTime, solves);
      const newSolve = {
        id: Date.now(),
        time: finalTime,
        scramble,
        timestamp: new Date().toLocaleString(),
        penalty: null,
      };
      setSolves((prev) => [newSolve, ...prev]);
      if (isPB) {
        showToast(`🎉 New Personal Best! ${formatTime(finalTime)}`, "pb");
      }
      setScramble(generateScramble());
    } else {
      setTime(0);
      setIsRunning(true);
    }
  };

  const togglePenalty = (id, type) => {
    setSolves((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, penalty: s.penalty === type ? null : type } : s,
      ),
    );
  };

  const getAverage = (count) => {
    if (solves.length < count) return "—";
    const subset = solves.slice(0, count);
    const hasDNF = subset.some((s) => s.penalty === "dnf");
    if (hasDNF) {
      const dnfCount = subset.filter((s) => s.penalty === "dnf").length;
      if (dnfCount > 1) return "DNF";
    }
    const times = subset
      .map((s) => getEffectiveTime(s))
      .filter((t) => t !== Infinity);
    if (times.length === 0) return "DNF";
    return formatTime(times.reduce((a, b) => a + b, 0) / times.length);
  };

  const getBest = () => {
    if (solves.length === 0) return "—";
    const validSolves = solves.filter((s) => s.penalty !== "dnf");
    if (validSolves.length === 0) return "DNF";
    return formatTime(Math.min(...validSolves.map((s) => getEffectiveTime(s))));
  };

  const deleteSolve = (id) => {
    setSolves((prev) => prev.filter((s) => s.id !== id));
  };

  const newScramble = () => {
    const next = generateScramble();
    scrambleRef.current = next;
    setScramble(next);
  };

  const timerColorClass = isRunning
    ? "timer-running"
    : spaceHeld
      ? "timer-ready"
      : "";

  return (
    <div className="home-page">
      <Navbar setIsAuthenticated={setIsAuthenticated} />

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => setToast(null)}>
            ×
          </button>
        </div>
      )}

      <main className="home-main">
        {/* Scramble */}
        <div className="scramble-bar">
          <p className="scramble-text">{scramble}</p>
          <button
            className="scramble-btn"
            onClick={newScramble}
            title="Generate new scramble"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="18"
              height="18"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
            </svg>
            New Scramble
          </button>
        </div>

        {/* Timer */}
        <div className="timer-area" onClick={handleTimerClick}>
          <div className={`timer-display ${timerColorClass}`}>
            {formatTime(time)}
          </div>
          <p className="timer-hint">
            {isRunning
              ? "Press SPACE or tap to stop"
              : spaceHeld
                ? "Release to start..."
                : "Hold SPACE or tap to start"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-chip">
            <span className="chip-label">Solves</span>
            <span className="chip-value">{solves.length}</span>
          </div>
          <div className="stat-chip best">
            <span className="chip-label">Best</span>
            <span className="chip-value">{getBest()}</span>
          </div>
          <div className="stat-chip">
            <span className="chip-label">Ao5</span>
            <span className="chip-value">{getAverage(5)}</span>
          </div>
          <div className="stat-chip">
            <span className="chip-label">Ao12</span>
            <span className="chip-value">{getAverage(12)}</span>
          </div>
          <div className="stat-chip">
            <span className="chip-label">Ao50</span>
            <span className="chip-value">{getAverage(50)}</span>
          </div>
        </div>

        {/* Recent Solves */}
        <div className="solves-panel">
          <div className="panel-header">
            <h2>Recent Solves</h2>
            {solves.length > 0 && (
              <button className="clear-all-btn" onClick={() => setSolves([])}>
                Clear All
              </button>
            )}
          </div>

          {solves.length === 0 ? (
            <div className="empty-solves">
              <div className="empty-icon">⏱</div>
              <p>No solves yet</p>
              <p className="empty-sub">
                Press spacebar or tap the timer to start!
              </p>
            </div>
          ) : (
            <div className="solves-list">
              {solves.slice(0, 25).map((solve, index) => (
                <div
                  key={solve.id}
                  className={`solve-row ${solve.penalty === "dnf" ? "solve-dnf" : ""}`}
                >
                  <span className="solve-num">{index + 1}</span>
                  <span
                    className={`solve-time ${solve.penalty ? "has-penalty" : ""}`}
                  >
                    {formatSolveTime(solve)}
                  </span>
                  <div className="solve-penalties">
                    <button
                      className={`penalty-btn ${solve.penalty === "+2" ? "active" : ""}`}
                      onClick={() => togglePenalty(solve.id, "+2")}
                      title="Add +2 penalty"
                    >
                      +2
                    </button>
                    <button
                      className={`penalty-btn dnf ${solve.penalty === "dnf" ? "active" : ""}`}
                      onClick={() => togglePenalty(solve.id, "dnf")}
                      title="Mark as DNF"
                    >
                      DNF
                    </button>
                  </div>
                  <span className="solve-scramble" title={solve.scramble}>
                    {solve.scramble}
                  </span>
                  <button
                    className="solve-del"
                    onClick={() => deleteSolve(solve.id)}
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
