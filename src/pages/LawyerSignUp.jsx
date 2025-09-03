import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Frame from "./Frame";

function LawyerSignup() {
  localStorage.clear();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    photo_id_type: "",
    photo_id_number: "",
    law_degree: "",
    enrollment_number: "",
    state_bar_council: "",
    sanad_number: "",
    certificate_of_practice_number: "",
    contact_email: "",
    contact_phone: "",
    firm_affiliation: "",
    disciplinary_record: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP after document verification
 const sendOtp = async () => {
  try {
    const res = await axios.post("http://localhost:5000/auth/lawyer/send-otp", formData);
    if (res.data.success) {
      alert("OTP sent to your email!");
      setStep(2);
    } else if (res.data.invalidFields) {
      // Display field-level errors
      const messages = res.data.invalidFields.map(f => `${f.field}: ${f.reason}`).join("\n");
      alert("Some fields are invalid:\n" + messages);
    } else {
      alert(res.data.message || "Document verification failed");
    }
  } catch (err) {
    console.error(err);
    alert("Failed to send OTP!");
  }
};


  // Step 2: Verify OTP and register lawyer
  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/lawyer/signup", {
        otp: formData.otp,
        lawyerData: formData,
      });
      if (res.data.success) {
        // Save lawyer info in localStorage
        localStorage.setItem("lawyer_email", formData.contact_email);
        localStorage.setItem("lawyer_name", formData.full_name);

        alert("Signup successful!");
        window.location.href = "/lawyer-dashboard";
      } else {
        alert(res.data.error || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed!");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Frame />
      <div className="auth-container signup-container">
        {step === 1 ? (
          <>
            <h2>Lawyer Signup</h2>
            <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} className="auth-input" />
            <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} className="auth-input" />
            <input type="text" name="photo_id_type" placeholder="Photo ID Type (Aadhaar/Passport)" onChange={handleChange} className="auth-input" />
            <input type="text" name="photo_id_number" placeholder="Photo ID Number" onChange={handleChange} className="auth-input" />
            <input type="text" name="law_degree" placeholder="Law Degree" onChange={handleChange} className="auth-input" />
            <input type="text" name="enrollment_number" placeholder="Enrollment Number" onChange={handleChange} className="auth-input" />
            <input type="text" name="state_bar_council" placeholder="State Bar Council" onChange={handleChange} className="auth-input" />
            <input type="text" name="sanad_number" placeholder="Sanad Number" onChange={handleChange} className="auth-input" />
            <input type="text" name="certificate_of_practice_number" placeholder="Certificate of Practice Number" onChange={handleChange} className="auth-input" />
            <input type="email" name="contact_email" placeholder="Email" onChange={handleChange} className="auth-input" />
            <input type="text" name="contact_phone" placeholder="Phone Number" onChange={handleChange} className="auth-input" />
            <input type="text" name="firm_affiliation" placeholder="Firm Affiliation" onChange={handleChange} className="auth-input" />
            <input type="text" name="disciplinary_record" placeholder="Disciplinary Record (if any)" onChange={handleChange} className="auth-input" />
            <button onClick={sendOtp} className="auth-btn primary-btn">Send OTP</button>
          </>
        ) : (
          <>
            <h2>Enter OTP</h2>
            <input type="text" name="otp" placeholder="Enter OTP" onChange={handleChange} className="auth-input" />
            <button onClick={handleSignup} className="auth-btn primary-btn">Verify & Signup</button>
          </>
        )}
        <button onClick={goToLogin} className="auth-btn outline-btn">Already have an account?</button>
      </div>
    </>
  );
}

export default LawyerSignup;
