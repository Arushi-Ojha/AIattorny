import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Frame from "./Frame";

function Signup() {
  localStorage.clear();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/check-user", {
        username: formData.username,
        email: formData.email,
      });
      if (res.data.exists) {
        alert("Username or Email already exists!");
      } else if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
      } else {
        await axios.post("http://localhost:5000/auth/send-otp", {
          email: formData.email,
        });
        alert("OTP sent to your email!");
        setStep(2);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/signup", formData);
      if (res.data.success) {
        alert("Signup successful!");
        navigate('/open')
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  const Login = () => {
    navigate("/login");
  };

  return (
    <><Frame/>
    <div className="auth-container signup-container">
      
      {step === 1 ? (
        <>
          <h2>Signup</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} className="auth-input" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="auth-input" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="auth-input" />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="auth-input" />
          <button onClick={checkUser} className="auth-btn primary-btn">Send OTP</button>
        </>
      ) : (
        <>
          <h2>Enter OTP</h2>
          <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} className="auth-input" />
          <button onClick={handleSignup} className="auth-btn primary-btn">Verify & Signup</button>
        </>
      )}
      <button onClick={Login} className="auth-btn outline-btn">Already have an account?</button>
    </div>
    </>
  );
}

export default Signup;
