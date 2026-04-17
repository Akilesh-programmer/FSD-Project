import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSolves } from "./utils/api";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Algorithms from "./pages/Algorithms";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("cubetimer_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [solves, setSolves] = useState([]);

  // Persist user to localStorage and load solves when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("cubetimer_user", JSON.stringify(user));
      setIsAuthenticated(true);
      fetchSolves()
        .then((data) => setSolves(data))
        .catch((err) => console.error("Failed to load solves:", err));
    } else {
      localStorage.removeItem("cubetimer_user");
      setIsAuthenticated(false);
      setSolves([]);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home
                handleLogout={handleLogout}
                solves={solves}
                setSolves={setSolves}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/statistics"
          element={
            isAuthenticated ? (
              <Statistics handleLogout={handleLogout} solves={solves} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/algorithms"
          element={
            isAuthenticated ? (
              <Algorithms handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/leaderboard"
          element={
            isAuthenticated ? (
              <Leaderboard handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile
                handleLogout={handleLogout}
                user={user}
                solves={solves}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
