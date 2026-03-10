import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Leaderboard.css";

const MOCK_LEADERBOARD = [
  {
    rank: 1,
    name: "Max Park",
    country: "🇺🇸",
    single: 3.13,
    ao5: 4.86,
    ao12: 5.41,
    solves: 24580,
    badge: "🥇",
  },
  {
    rank: 2,
    name: "Yiheng Wang",
    country: "🇨🇳",
    single: 3.47,
    ao5: 4.92,
    ao12: 5.55,
    solves: 19340,
    badge: "🥈",
  },
  {
    rank: 3,
    name: "Luke Garrett",
    country: "🇺🇸",
    single: 3.98,
    ao5: 5.12,
    ao12: 5.78,
    solves: 16200,
    badge: "🥉",
  },
  {
    rank: 4,
    name: "Ruihang Xu",
    country: "🇨🇳",
    single: 4.11,
    ao5: 5.34,
    ao12: 5.89,
    solves: 15890,
  },
  {
    rank: 5,
    name: "Tymon Kolasiński",
    country: "🇵🇱",
    single: 4.25,
    ao5: 5.45,
    ao12: 6.01,
    solves: 21340,
  },
  {
    rank: 6,
    name: "Feliks Zemdegs",
    country: "🇦🇺",
    single: 4.16,
    ao5: 5.53,
    ao12: 6.12,
    solves: 32100,
  },
  {
    rank: 7,
    name: "Leo Borber",
    country: "🇺🇸",
    single: 4.38,
    ao5: 5.61,
    ao12: 6.25,
    solves: 12450,
  },
  {
    rank: 8,
    name: "Matty Hiroto Inaba",
    country: "🇺🇸",
    single: 4.52,
    ao5: 5.72,
    ao12: 6.33,
    solves: 18760,
  },
  {
    rank: 9,
    name: "Patrick Ponce",
    country: "🇺🇸",
    single: 4.69,
    ao5: 5.85,
    ao12: 6.48,
    solves: 27300,
  },
  {
    rank: 10,
    name: "Asher Kim",
    country: "🇺🇸",
    single: 4.76,
    ao5: 5.91,
    ao12: 6.52,
    solves: 9870,
  },
  {
    rank: 11,
    name: "Sebastian Weyer",
    country: "🇩🇪",
    single: 4.88,
    ao5: 6.05,
    ao12: 6.64,
    solves: 29400,
  },
  {
    rank: 12,
    name: "Ciarán Beahan",
    country: "🇮🇪",
    single: 4.95,
    ao5: 6.12,
    ao12: 6.71,
    solves: 14200,
  },
];

const EVENTS = [
  { key: "3x3", label: "3×3", icon: "🟩" },
  { key: "2x2", label: "2×2", icon: "🟧" },
  { key: "4x4", label: "4×4", icon: "🟦" },
  { key: "5x5", label: "5×5", icon: "🟪" },
];

function Leaderboard({ setIsAuthenticated }) {
  const [event, setEvent] = useState("3x3");
  const [sortBy, setSortBy] = useState("single");
  const [search, setSearch] = useState("");

  const sorted = [...MOCK_LEADERBOARD]
    .sort((a, b) => a[sortBy] - b[sortBy])
    .filter((entry) => entry.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="leaderboard-page">
      <Navbar setIsAuthenticated={setIsAuthenticated} />

      <div className="leaderboard-content">
        <div className="page-header">
          <h1 className="page-title">🏆 Leaderboard</h1>
          <p className="page-subtitle">
            See where you stack up against the best cubers in the world
          </p>
        </div>

        {/* Controls */}
        <div className="lb-controls">
          <div className="lb-events">
            {EVENTS.map((e) => (
              <button
                key={e.key}
                className={`lb-event-btn ${event === e.key ? "active" : ""}`}
                onClick={() => setEvent(e.key)}
              >
                <span>{e.icon}</span>
                {e.label}
              </button>
            ))}
          </div>

          <div className="lb-filters">
            <div className="lb-search">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search cubers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="lb-sort">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="single">Best Single</option>
                <option value="ao5">Best Ao5</option>
                <option value="ao12">Best Ao12</option>
                <option value="solves">Total Solves</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="lb-podium">
          {sorted.slice(0, 3).map((entry, i) => (
            <div className={`podium-card podium-${i + 1}`} key={entry.name}>
              <div className="podium-rank">{entry.badge}</div>
              <div className="podium-avatar">
                {entry.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="podium-name">
                {entry.country} {entry.name}
              </div>
              <div className="podium-time">{entry.single}s</div>
              <div className="podium-detail">
                Ao5: {entry.ao5}s &middot; {entry.solves.toLocaleString()}{" "}
                solves
              </div>
            </div>
          ))}
        </div>

        {/* Full Table */}
        <div className="lb-table-wrap">
          <table className="lb-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cuber</th>
                <th
                  className={sortBy === "single" ? "sorted" : ""}
                  onClick={() => setSortBy("single")}
                >
                  Single ↕
                </th>
                <th
                  className={sortBy === "ao5" ? "sorted" : ""}
                  onClick={() => setSortBy("ao5")}
                >
                  Ao5 ↕
                </th>
                <th
                  className={sortBy === "ao12" ? "sorted" : ""}
                  onClick={() => setSortBy("ao12")}
                >
                  Ao12 ↕
                </th>
                <th
                  className={sortBy === "solves" ? "sorted" : ""}
                  onClick={() => setSortBy("solves")}
                >
                  Solves ↕
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => (
                <tr key={entry.name} className={i < 3 ? `top-${i + 1}` : ""}>
                  <td className="rank-cell">{entry.badge || i + 1}</td>
                  <td className="name-cell">
                    <span className="country">{entry.country}</span>{" "}
                    {entry.name}
                  </td>
                  <td className="time-cell">{entry.single}s</td>
                  <td className="time-cell">{entry.ao5}s</td>
                  <td className="time-cell">{entry.ao12}s</td>
                  <td className="solves-cell">
                    {entry.solves.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lb-note">
          <span>ℹ️</span> Leaderboard data is simulated for demonstration
          purposes.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Leaderboard;
