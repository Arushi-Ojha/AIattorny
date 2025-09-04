import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);
  const [showQueryBox, setShowQueryBox] = useState(null);
  const [queryText, setQueryText] = useState("");
  var navigate = useNavigate();
  // Fetch user ID once
  useEffect(() => {
    if (username) {
      axios
        .get(`https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/auth/get-userid/${username}`)
        .then((res) => {
          localStorage.setItem("user_id", res.data.user_id);
          console.log("User ID saved in localStorage:", res.data.user_id);
        })
        .catch((err) => console.error(err));

      // Fetch documents
      axios
        .get(`https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/documents/${username}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
  }, [username]);

  if (!userData) return <p className="dashboard-loading">Loading...</p>;

  const handleDelete = async (docId) => {
    await axios.delete(`https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/documents/${docId}`);
    setUserData({
      ...userData,
      documents: userData.documents.filter((d) => d.id !== docId),
    });
  };

  const handlePublishQuery = async (docId) => {
    try {
      await axios.post(`https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/documents/queries`, {
        user_id: localStorage.getItem("user_id"),
        document_id: docId,
        query_topic: `Query about ${docId}`,
        query_description: queryText,
      });
      setShowQueryBox(null);
      setQueryText("");
      alert("Query published!");
    } catch (err) {
      console.error(err);
      alert("Failed to publish query");
    }
  };
  function Scan() {
    navigate('/scanner')
  }

  return (
    <>
    <button onClick={Scan} className="scan-emoji-btn">
        <span className="emoji">📸</span>
        <span className="btn-text">Scan Documents</span>
      </button>
    
    <div className="dashboard-container">
      <h2 className="dashboard-welcome">Welcome, {userData.username} </h2>
      <h3 className="dashboard-subtitle">Your Documents</h3>
      <div className="documents-list">
        {userData.documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <h4 className="document-title">{doc.document_name}</h4>
            <p className="document-details">{doc.details}</p>
            <div className="document-actions">
              <button
                className="doc-btn delete-btn"
                onClick={() => handleDelete(doc.id)}
              >
                Delete
              </button>
              <button
                className="doc-btn query-btn"
                onClick={() => setShowQueryBox(doc.id)}
              >
                Ask Public
              </button>
            </div>

            {showQueryBox === doc.id && (
              <div className="query-box-container">
                <textarea
                  className="query-textarea"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Describe your query..."
                />
                <div className="query-buttons">
                  <button
                    className="doc-btn publish-btn"
                    onClick={() => handlePublishQuery(doc.id)}
                  >
                    Publish
                  </button>
                  <button
                    className="doc-btn cancel-btn"
                    onClick={() => setShowQueryBox(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Dashboard;
