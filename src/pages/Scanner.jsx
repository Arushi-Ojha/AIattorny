import React, { useState } from "react";
import axios from "axios";
import Frame from "./Frame";

function Scanner() {
  const username = localStorage.getItem("username");
  const [docName, setDocName] = useState("");
  const [files, setFiles] = useState([]);
  const [interpreted, setInterpreted] = useState("");
  const [loading, setLoading] = useState(false); // new state

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleScan = async () => {
    if (!docName || files.length === 0) {
      alert("Please enter document name and select files!");
      return;
    }

    setLoading(true); // show loader

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("document_name", docName);

      files.forEach((file) => {
        formData.append("documents", file);
      });

      const res = await axios.post(
        "http://localhost:5000/documents/scan-images",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setInterpreted(res.data.details);
    } catch (err) {
      console.error(err);
      alert("Failed to interpret document!");
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <>
      <Frame />
      <div className="scanner-container">
        <h2 className="scanner-title">
          Hey Buddy! You can upload your documents here!
        </h2>

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

        <button onClick={handleScan} className="scanner-btn scan-btn">
          Interpret
        </button>

        {/* Loader */}
        {loading && (
          <div className="scanner-loader">
            <div className="spinner"></div>
            <p>Processing...</p>
          </div>
        )}

        {interpreted && !loading && (
          <div className="scanner-result">
            <h3 className="result-title">AI Interpretation:</h3>
            <p className="result-text">{interpreted}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Scanner;
