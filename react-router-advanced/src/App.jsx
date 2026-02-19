import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Profile from "./components/Profile.jsx";
import User from "./components/User.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div style={{ padding: 20 }}>
        <nav style={{ marginBottom: 20 }}>
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <Link to="/about" style={{ marginRight: 10 }}>About</Link>
          <Link to="/profile" style={{ marginRight: 10 }}>Profile</Link>
          <Link to="/user/1">User 1</Link>
        </nav>

        <div style={{ marginBottom: 20 }}>
          {isAuthenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Protected Route */}
          <Route 
            path="/profile/*" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Dynamic Route */}
          <Route path="/user/:id" element={<User />} />

          {/* Redirect fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
