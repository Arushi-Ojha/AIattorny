// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const username = localStorage.getItem("username");

  if (!username) {
    // Redirect to login page if username not found
    return <Navigate to="/login" replace />;
  }

  // Render the children if username exists
  return children;
};

export default ProtectedRoute;
