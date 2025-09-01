import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    var navigate = useNavigate();
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
      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };
  function Login(){
    navigate('/login');
  }

  return (
    <div style={{ padding: "20px" }}>
      {step === 1 ? (
        <>
          <h2>Signup</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} /><br />
          <button onClick={checkUser}>Send OTP</button>
        </>
      ) : (
        <>
          <h2>Enter OTP</h2>
          <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} /><br />
          <button onClick={handleSignup}>Verify & Signup</button>
        </>
      )}
      <button onClick={Login}>already have an account?</button>
    </div>
  );
}

export default Signup;
