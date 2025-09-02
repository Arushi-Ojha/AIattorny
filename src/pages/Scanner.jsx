import React, { useState } from "react";
import axios from "axios";

function Scanner() {
  const username = localStorage.getItem("username");
  const [docName, setDocName] = useState("");
  const [files, setFiles] = useState([]);
  const [interpreted, setInterpreted] = useState("");

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleScan = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("document_name", docName);

      files.forEach((file) => {
        formData.append("documents", file);
      });

      const res = await axios.post("http://localhost:5000/documents/scan-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setInterpreted(res.data.details);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="scanner-container">
      <h2 className="scanner-title">Hey Buddy! You can upload your documents here!</h2>
      
      <input
        type="text"
        placeholder="Document Name"
        value={docName}
        onChange={(e) => setDocName(e.target.value)}
        className="scanner-input"
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="scanner-file-input"
      />

      <button onClick={handleScan} className="scanner-btn scan-btn">Interpret</button>

      {interpreted && (
        <div className="scanner-result">
          <h3 className="result-title">AI Interpretation:</h3>
          <p className="result-text">{interpreted}</p>
        </div>
      )}
    </div>
  );
}

export default Scanner;
