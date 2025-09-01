import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  var navigate = useNavigate();
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
  function Signup(){
    navigate('/register');
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} /><br />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={Signup}>dont have a account?</button>
    </div>
  );
}

export default Login;
