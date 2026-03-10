import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="landing-bg">
        <div className="bg-grid"></div>
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
      </div>

      {/* Top Bar */}
      <header className="landing-header">
        <div className="landing-brand">
          <div className="landing-logo">
            <span style={{ background: "#ff6b6b" }}></span>
            <span style={{ background: "#ffd93d" }}></span>
            <span style={{ background: "#6bcb77" }}></span>
            <span style={{ background: "#4d96ff" }}></span>
          </div>
          <span className="landing-brand-text">CubeTimer</span>
        </div>
        <div className="landing-nav">
          <Link to="/login" className="landing-link">
            Sign In
          </Link>
          <Link to="/signup" className="landing-cta-sm">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Built for Speedcubers
        </div>
        <h1 className="hero-title">
          The <span className="gradient-text">Fastest</span> Way
          <br />
          to Track Your Solves
        </h1>
        <p className="hero-desc">
          A professional-grade Rubik's Cube timer with scramble generation,
          detailed statistics, algorithm references, and community leaderboards.
          Everything you need to improve your times.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="hero-btn primary">
            Start Solving
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link to="/login" className="hero-btn secondary">
            Sign In
          </Link>
        </div>

        {/* Demo Timer */}
        <div className="hero-demo">
          <div className="demo-window">
            <div className="demo-topbar">
              <div className="demo-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="demo-title">CubeTimer</span>
              <div></div>
            </div>
            <div className="demo-scramble">
              R U R' U' R' F R2 U' R' U' R U R' F'
            </div>
            <div className="demo-timer">
              <span className="demo-time">12.47</span>
            </div>
            <div className="demo-stats">
              <div className="demo-stat">
                <span className="ds-label">Best</span>
                <span className="ds-value green">9.83</span>
              </div>
              <div className="demo-stat">
                <span className="ds-label">Ao5</span>
                <span className="ds-value">12.05</span>
              </div>
              <div className="demo-stat">
                <span className="ds-label">Ao12</span>
                <span className="ds-value">13.21</span>
              </div>
              <div className="demo-stat">
                <span className="ds-label">Solves</span>
                <span className="ds-value">847</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="features-header">
          <h2>
            Everything a speedcuber <span className="gradient-text">needs</span>
          </h2>
          <p>
            Packed with the tools and insights that help you go from sub-60 to
            sub-10.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-wrap cyan">
              <span>⏱</span>
            </div>
            <h3>Precision Timer</h3>
            <p>
              Centisecond-accurate timer with spacebar hold-to-start, just like
              a real stackmat. Tap support for mobile.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap purple">
              <span>🔀</span>
            </div>
            <h3>Smart Scrambles</h3>
            <p>
              WCA-legal random scramble generator with proper move filtering.
              New scramble auto-generated after each solve.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap green">
              <span>📊</span>
            </div>
            <h3>Deep Statistics</h3>
            <p>
              Ao5, Ao12, Ao50, Ao100, best averages, time distribution charts,
              trend graphs, and standard deviation.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap orange">
              <span>📖</span>
            </div>
            <h3>Algorithm Library</h3>
            <p>
              Full OLL, PLL, F2L, and beginner method reference with one-click
              copy. Learn and practice algorithms.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap pink">
              <span>🏆</span>
            </div>
            <h3>Leaderboards</h3>
            <p>
              Compete with the community. See where you rank in single and
              average categories across events.
            </p>
          </div>
          <div className="feature-item">
            <div className="feature-icon-wrap blue">
              <span>⚡</span>
            </div>
            <h3>Penalty Support</h3>
            <p>
              Mark solves as +2 or DNF, just like official WCA competitions.
              Penalties are reflected in your stats.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner">
        <div className="banner-stat">
          <span className="banner-num">10K+</span>
          <span className="banner-label">Solves Tracked</span>
        </div>
        <div className="banner-divider"></div>
        <div className="banner-stat">
          <span className="banner-num">37+</span>
          <span className="banner-label">Algorithms</span>
        </div>
        <div className="banner-divider"></div>
        <div className="banner-stat">
          <span className="banner-num">7</span>
          <span className="banner-label">Puzzle Types</span>
        </div>
        <div className="banner-divider"></div>
        <div className="banner-stat">
          <span className="banner-num">100%</span>
          <span className="banner-label">Free</span>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>
          Ready to beat your <span className="gradient-text">PB</span>?
        </h2>
        <p>Join thousands of cubers tracking their progress with CubeTimer.</p>
        <Link to="/signup" className="hero-btn primary">
          Create Free Account
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="landing-logo">
              <span style={{ background: "#ff6b6b" }}></span>
              <span style={{ background: "#ffd93d" }}></span>
              <span style={{ background: "#6bcb77" }}></span>
              <span style={{ background: "#4d96ff" }}></span>
            </div>
            <span>CubeTimer</span>
          </div>
          <p className="footer-copy">
            &copy; 2026 CubeTimer. Built with ❤️ for the cubing community.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
