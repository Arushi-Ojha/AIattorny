import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/SignUp";
import Login from "./pages/LogIn";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Open from "./pages/Open";
import Donate from "./pages/Donate";
import Chats from "./pages/Chats.jsx";
import ErrorPage from "./pages/error.jsx";
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
        <Route path="/chat/:queryId" element={<Chats />}/>
        <Route path="/error" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
