import React, { useState } from "react";
import axios from "axios";

const Scanner = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [translated, setTranslated] = useState("");   // store translated text
  const [language, setLanguage] = useState("en");     // default English

  // Reset page
  const handleReset = () => {
    setFile(null);
    setResult(null);
    setTranslated("");
    setLoading(false);
  };

  // Upload and analyse
  const handleUpload = async () => {
    if (!file) return alert("Please upload or capture an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://3rwo773uu6a254qdcgb7uqyyum0wdzvk.lambda-url.ap-southeast-2.on.aws/api/analyse",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Error analysing document");
    } finally {
      setLoading(false);
    }
  };

  // Translate simplified text
  const handleTranslate = async () => {
    if (!result) return;
    try {
      setLoading(true);
      const response = await axios.post("https://3rwo773uu6a254qdcgb7uqyyum0wdzvk.lambda-url.ap-southeast-2.on.aws/api/translate", {
        text: result.simplified_text,
        language: language,
      });
      setTranslated(response.data.translated_text);
    } catch (err) {
      console.error(err);
      alert("Error translating text");
    } finally {
      setLoading(false);
    }
  };

  // Pick emoji based on threat level
  const getThreatEmoji = (level) => {
    if (!level) return "";
    const lower = level.toLowerCase();
    if (lower.includes("low")) return "🟢";
    if (lower.includes("medium")) return "🟡";
    if (lower.includes("high")) return "🔴";
    return "🟠";
  };

  return (
    <div className="container">
      {!result ? (
        <>
          <h1>Our Bot Is Here To Help You!</h1>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          {file && <p>{file.name}</p>}
          <button onClick={handleUpload} disabled={!file || loading}>
            {loading ? "Analysing..." : "Analyse Document"}
          </button>
          {loading && <div className="loader"></div>}
        </>
      ) : (
        <>
          <h2>So here is what it means</h2>
          <p>{result.simplified_text}</p>

          <h2>Threat Level</h2>
          <p>
            {getThreatEmoji(result.threat_level)} {result.threat_level}
          </p>

          {/* Language selection */}
          <div style={{ marginTop: "20px" }} className="language-select">
            <h3>Translate</h3>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="mr">Marathi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
              <option value="gu">Gujarati</option>
              <option value="ur">Urdu</option>
              <option value="kn">Kannada</option>
              <option value="or">Odia</option>
              <option value="ml">Malayalam</option>
            </select>
            <button onClick={handleTranslate} disabled={loading}>
              {loading ? "Translating..." : "Translate"}
            </button>
          </div>

          {/* Show translated text */}
          {translated && (
            <div className="translated-box">
              <h3>Translated Text</h3>
              <p>{translated}</p>
            </div>
          )}

          <button onClick={handleReset}>Upload Another</button>
        </>
      )}
    </div>
  );
};

export default Scanner;
