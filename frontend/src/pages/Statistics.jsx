import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatTime } from "../utils/format";
import "./Statistics.css";

function Statistics({ handleLogout, solves }) {
  // Get effective time accounting for penalties
  const getEffectiveTime = (solve) => {
    if (solve.penalty === "dnf") return Infinity;
    if (solve.penalty === "+2") return solve.time + 2000;
    return solve.time;
  };

  const validSolves = solves.filter((s) => s.penalty !== "dnf");

  const getAverage = (count) => {
    if (solves.length < count) return null;
    const subset = solves.slice(0, count);
    const times = subset
      .map((s) => getEffectiveTime(s))
      .filter((t) => t !== Infinity);
    if (times.length === 0) return null;
    return times.reduce((a, b) => a + b, 0) / times.length;
  };

  const getBest = () => {
    if (validSolves.length === 0) return null;
    return Math.min(...validSolves.map((s) => getEffectiveTime(s)));
  };

  const getWorst = () => {
    if (validSolves.length === 0) return null;
    return Math.max(...validSolves.map((s) => getEffectiveTime(s)));
  };

  const getMean = () => {
    if (validSolves.length === 0) return null;
    const times = validSolves.map((s) => getEffectiveTime(s));
    return times.reduce((a, b) => a + b, 0) / times.length;
  };

  const getStdDev = () => {
    if (validSolves.length < 2) return null;
    const mean = getMean();
    const squaredDiffs = validSolves.map((s) =>
      Math.pow(getEffectiveTime(s) - mean, 2),
    );
    return Math.sqrt(
      squaredDiffs.reduce((a, b) => a + b, 0) / validSolves.length,
    );
  };

  const getBestAverage = (size) => {
    if (solves.length < size) return null;
    let bestAvg = Infinity;
    for (let i = 0; i <= solves.length - size; i++) {
      const window = solves.slice(i, i + size);
      const times = window
        .map((s) => getEffectiveTime(s))
        .filter((t) => t !== Infinity);
      if (times.length === 0) continue;
      const avg = times.reduce((a, b) => a + b, 0) / times.length;
      if (avg < bestAvg) bestAvg = avg;
    }
    return bestAvg === Infinity ? null : bestAvg;
  };

  const getDistribution = () => {
    if (validSolves.length < 2) return [];
    const times = validSolves.map((s) => getEffectiveTime(s));
    const min = Math.min(...times);
    const max = Math.max(...times);
    const range = max - min;
    if (range === 0) return [];
    const bucketSize = range / 8;
    const buckets = Array(8).fill(0);

    times.forEach((t) => {
      const index = Math.min(Math.floor((t - min) / bucketSize), 7);
      buckets[index]++;
    });

    const maxCount = Math.max(...buckets);
    return buckets.map((count, i) => ({
      label: formatTime(Math.round(min + i * bucketSize)),
      count,
      percentage: maxCount > 0 ? (count / maxCount) * 100 : 0,
    }));
  };

  // Build trend data (reversed so oldest is first)
  const getTrendData = () => {
    const reversed = [...validSolves].reverse();
    const maxPoints = 50;
    const data =
      reversed.length > maxPoints
        ? reversed.slice(reversed.length - maxPoints)
        : reversed;
    if (data.length < 2) return null;
    const times = data.map((s) => getEffectiveTime(s));
    const min = Math.min(...times);
    const max = Math.max(...times);
    const range = max - min || 1;
    return {
      points: times.map((t, i) => ({
        x: (i / (times.length - 1)) * 100,
        y: 100 - ((t - min) / range) * 80 - 10,
        time: t,
      })),
      min,
      max,
    };
  };

  const best = getBest();
  const worst = getWorst();
  const mean = getMean();
  const stdDev = getStdDev();
  const ao5 = getAverage(5);
  const ao12 = getAverage(12);
  const ao50 = getAverage(50);
  const ao100 = getAverage(100);
  const bestAo5 = getBestAverage(5);
  const bestAo12 = getBestAverage(12);
  const distribution = getDistribution();
  const trend = getTrendData();

  const formatSolveDisplay = (solve) => {
    if (solve.penalty === "dnf") return "DNF";
    if (solve.penalty === "+2") return formatTime(solve.time + 2000) + "+";
    return formatTime(solve.time);
  };

  return (
    <div className="stats-page">
      <Navbar handleLogout={handleLogout} />
      <main className="stats-main">
        <div className="page-header">
          <h1 className="page-title">📊 Statistics</h1>
          <p className="page-subtitle">
            Track your solving performance over time
          </p>
        </div>

        {solves.length === 0 ? (
          <div className="stats-empty">
            <div className="empty-icon">📊</div>
            <h2>No Data Yet</h2>
            <p>Complete some solves to see your statistics here.</p>
          </div>
        ) : (
          <>
            <div className="stats-overview">
              <div className="overview-card">
                <span className="overview-label">Total Solves</span>
                <span className="overview-value">{solves.length}</span>
              </div>
              <div className="overview-card highlight-green">
                <span className="overview-label">Personal Best</span>
                <span className="overview-value">
                  {best !== null ? formatTime(best) : "—"}
                </span>
              </div>
              <div className="overview-card">
                <span className="overview-label">Worst Time</span>
                <span className="overview-value">
                  {worst !== null ? formatTime(worst) : "—"}
                </span>
              </div>
              <div className="overview-card">
                <span className="overview-label">Session Mean</span>
                <span className="overview-value">
                  {mean !== null ? formatTime(mean) : "—"}
                </span>
              </div>
              <div className="overview-card">
                <span className="overview-label">Std Deviation</span>
                <span className="overview-value">
                  {stdDev !== null ? formatTime(stdDev) : "—"}
                </span>
              </div>
            </div>

            <div className="stats-card">
              <h2 className="card-title">Averages</h2>
              <div className="averages-grid">
                <div className="avg-card">
                  <div className="avg-header">
                    <span className="avg-type">Current Ao5</span>
                    <span className="avg-value">
                      {ao5 !== null ? formatTime(ao5) : "—"}
                    </span>
                  </div>
                  <div className="avg-best">
                    Best: {bestAo5 !== null ? formatTime(bestAo5) : "—"}
                  </div>
                </div>
                <div className="avg-card">
                  <div className="avg-header">
                    <span className="avg-type">Current Ao12</span>
                    <span className="avg-value">
                      {ao12 !== null ? formatTime(ao12) : "—"}
                    </span>
                  </div>
                  <div className="avg-best">
                    Best: {bestAo12 !== null ? formatTime(bestAo12) : "—"}
                  </div>
                </div>
                <div className="avg-card">
                  <div className="avg-header">
                    <span className="avg-type">Current Ao50</span>
                    <span className="avg-value">
                      {ao50 !== null ? formatTime(ao50) : "—"}
                    </span>
                  </div>
                </div>
                <div className="avg-card">
                  <div className="avg-header">
                    <span className="avg-type">Current Ao100</span>
                    <span className="avg-value">
                      {ao100 !== null ? formatTime(ao100) : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Trend Graph */}
            {trend && (
              <div className="stats-card">
                <h2 className="card-title">
                  Solve Trend
                  <span className="card-subtitle">
                    Last {trend.points.length} solves
                  </span>
                </h2>
                <div className="trend-chart">
                  <div className="trend-y-axis">
                    <span>{formatTime(trend.max)}</span>
                    <span>
                      {formatTime(Math.round((trend.max + trend.min) / 2))}
                    </span>
                    <span>{formatTime(trend.min)}</span>
                  </div>
                  <div className="trend-graph">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      {/* Grid lines */}
                      <line
                        x1="0"
                        y1="10"
                        x2="100"
                        y2="10"
                        className="trend-grid"
                      />
                      <line
                        x1="0"
                        y1="50"
                        x2="100"
                        y2="50"
                        className="trend-grid"
                      />
                      <line
                        x1="0"
                        y1="90"
                        x2="100"
                        y2="90"
                        className="trend-grid"
                      />
                      {/* Area fill */}
                      <polygon
                        points={`${trend.points.map((p) => `${p.x},${p.y}`).join(" ")} ${trend.points[trend.points.length - 1].x},100 ${trend.points[0].x},100`}
                        className="trend-area"
                      />
                      {/* Line */}
                      <polyline
                        points={trend.points
                          .map((p) => `${p.x},${p.y}`)
                          .join(" ")}
                        className="trend-line"
                      />
                      {/* Dots */}
                      {trend.points.map((p, i) => (
                        <circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r="0.8"
                          className="trend-dot"
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {distribution.length > 0 && (
              <div className="stats-card">
                <h2 className="card-title">Time Distribution</h2>
                <div className="distribution-chart">
                  {distribution.map((bucket, i) => (
                    <div key={i} className="dist-col">
                      <span className="dist-count">
                        {bucket.count > 0 ? bucket.count : ""}
                      </span>
                      <div
                        className="dist-bar"
                        style={{ height: `${Math.max(bucket.percentage, 4)}%` }}
                      ></div>
                      <span className="dist-label">{bucket.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="stats-card">
              <h2 className="card-title">All Solves ({solves.length})</h2>
              <div className="solves-table">
                <div className="table-header">
                  <span className="col-num">#</span>
                  <span className="col-time">Time</span>
                  <span className="col-scramble">Scramble</span>
                  <span className="col-date">Date</span>
                </div>
                <div className="table-body">
                  {solves.map((solve, index) => (
                    <div
                      key={solve.id}
                      className={`table-row ${solve.penalty !== "dnf" && getEffectiveTime(solve) === best ? "best-row" : ""} ${solve.penalty === "dnf" ? "dnf-row" : ""}`}
                    >
                      <span className="col-num">{index + 1}</span>
                      <span
                        className={`col-time ${solve.penalty ? "has-penalty" : ""}`}
                      >
                        {formatSolveDisplay(solve)}
                      </span>
                      <span className="col-scramble">
                        {solve.scramble || "—"}
                      </span>
                      <span className="col-date">{solve.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Statistics;
