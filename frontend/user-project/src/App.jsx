import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

// Helper to decode JWT from localStorage
const getTokenPayload = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

// Check if user is admin
const isAdmin = () => {
  const payload = getTokenPayload();
  return payload?.roles?.includes("ROLE_ADMIN");
};

// Check if user is logged in
const isLoggedIn = () => !!localStorage.getItem("token");

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLoggedIn() ? (isAdmin() ? "/users" : "/profile") : "/login"} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={isLoggedIn() ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/users"
          element={isAdmin() ? <Users /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
