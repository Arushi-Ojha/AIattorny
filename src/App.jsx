import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/SignUp";
import Login from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Open from "./pages/Open";
import Donate from "./pages/Donate";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/open" element={<Open />} />
      </Routes>
    </Router>
  );
}

export default App;
