
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5000/documents/${username}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
  }, [username]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h2>Welcome, {userData.username}</h2>
      <p>Email: {userData.email}</p>

      <h3>Your Saved Documents</h3>
      {userData.documents.length === 0 ? (
        <p>No documents saved yet.</p>
      ) : (
        <ul>
          {userData.documents.map((doc) => (
            <li key={doc.id}>
              <h4>{doc.document_name}</h4>
              <p>{doc.details}</p>
              <small>
                Saved on {doc.saved_date} at {doc.saved_time}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
