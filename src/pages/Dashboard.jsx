import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);
  const [showQueryBox, setShowQueryBox] = useState(null);
  const [queryText, setQueryText] = useState("");

axios
  .get(`http://localhost:5000/auth/get-userid/${username}`)
  .then((res) => {
    localStorage.setItem("user_id", res.data.user_id);
    console.log("User ID saved in localStorage:", res.data.user_id);
  })
  .catch((err) => console.error(err));
  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5000/documents/${username}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
  }, [username]);

  if (!userData) return <p>Loading...</p>;

  const handleDelete = async (docId) => {
    await axios.delete(`http://localhost:5000/documents/${docId}`);
    setUserData({
      ...userData,
      documents: userData.documents.filter((d) => d.id !== docId),
    });
  };

  const handlePublishQuery = async (docId) => {
  try {
    await axios.post("http://localhost:5000/documents/queries", {
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


  return (
    <div className="dashboard">
      <h2>Welcome, {userData.username}</h2>
      <h3>Your Documents</h3>
      {userData.documents.map((doc) => (
        <div key={doc.id} className="doc-card">
          <h4>{doc.document_name}</h4>
          <p>{doc.details}</p>
          <button onClick={() => handleDelete(doc.id)}>Delete</button>
          <button onClick={() => setShowQueryBox(doc.id)}>Ask Public</button>

          {showQueryBox === doc.id && (
            <div className="query-box">
              <textarea
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Describe your query..."
              />
              <button onClick={() => handlePublishQuery(doc.id)}>Publish</button>
              <button onClick={() => setShowQueryBox(null)}>Cancel</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
