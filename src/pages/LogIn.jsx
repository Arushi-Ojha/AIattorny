import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Frame from "./Frame";

function Login() {
  localStorage.clear();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", formData);
      if (res.data.success) {
        alert("Login successful!");
        localStorage.setItem("username", res.data.user.username);
        window.location.href = "/dashboard";
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  const Signup = () => {
    navigate("/register");
  };
  const handleDemo = () => {
    setFormData({
      username: "DummyUser",
      password: "Arushi100@",
    });
  };

  return (
    <>
    <Frame/>
    <div className="auth-container login-container">
      <h2>Login</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="auth-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="auth-input"
      />
      <button onClick={handleLogin} className="auth-btn primary-btn">Login</button>
      <button onClick={handleDemo} className="auth-btn outline-btn">Demo Test</button>
      <button onClick={Signup} className="auth-btn outline-btn">Don't have an account?</button>
    </div>
    </>
  );
}

export default Login;
