import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Frame from "./Frame";

function Login() {
  localStorage.clear();
  const navigate = useNavigate();

  const [userType, setUserType] = useState("user"); // "user" or "lawyer"
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      let res;
      if (userType === "user") {
        // User login
        res = await axios.post(`https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/auth/user/login`, {
          username: formData.username,
          password: formData.password,
        });

        if (res.data.success) {
          // Get user_id after successful login
          const idRes = await axios.get(
            `https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/auth/get-userid/${formData.username}`
          );

          localStorage.setItem("username", res.data.user.username);
          localStorage.setItem("user_id", idRes.data.user_id); // save user_id
          alert("User login successful!");
          window.location.href = "/dashboard";
        } else {
          alert(res.data.error);
        }
      } else {
        // Lawyer login
        // Lawyer login
        res = await axios.post(`https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/auth/lawyer/login`, {
          email: formData.email,
          dob: formData.dob,
        });

        if (res.data.success) {
          // ✅ Fetch lawyer_id after successful login
          const idRes = await axios.get(
            `https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/documents/attorney-id/${formData.email}`
          );

          localStorage.setItem("lawyer_email", res.data.lawyer.contact_email);
          localStorage.setItem("lawyer_name", res.data.lawyer.full_name);
          localStorage.setItem("lawyer_id", idRes.data.attorney_id); // ✅ Save lawyer_id

          alert("Lawyer login successful!");
          window.location.href = "/open";
        } else {
          alert(res.data.message);
        }

      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };


  const handleDemo = () => {
    setFormData({
      username: "DummyUser",
      password: "Arushi100@",
      email: "",
      dob: "",
    });
  };

  const goToSignup = () => {
    navigate("/register");
  };

  return (
    <>
      <Frame />
      <div className="auth-container login-container">
        <h2>Login</h2>

        {/* User type selection */}
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="auth-input"
        >
          <option value="user">User</option>
          <option value="lawyer">Lawyer</option>
        </select>

        {userType === "user" ? (
          <>
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
          </>
        ) : (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="auth-input"
            />
          </>
        )}

        <button onClick={handleLogin} className="auth-btn primary-btn">
          Login
        </button>
        <button onClick={handleDemo} className="auth-btn outline-btn">
          Demo Test
        </button>
        <button onClick={goToSignup} className="auth-btn outline-btn">
          Don't have an account?
        </button>
      </div>
    </>
  );
}

export default Login;
