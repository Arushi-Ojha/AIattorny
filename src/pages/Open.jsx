import React, { useEffect, useState } from "react";
import axios from "axios";
import Frame from "./Frame";

function Open() {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const res = await axios.get("http://localhost:5000/documents/queries");
                setQueries(res.data);
            } catch (err) {
                console.error(err);
                alert("Failed to load queries");
            }
        };
        fetchQueries();
    }, []);

    return (
        <>
        <Frame/>
        <div className="open-container">
            <h2 className="open-title">Public Queries</h2>
            {queries.map((q) => (
                <div key={q.id} className="open-query-card">
                    <h4 className="open-query-topic">{q.query_topic}</h4>
                    <p className="open-query-user">Asked by: {q.username}</p>
                    <div className="open-buttons">
                        <button
                            className="open-button open-button-description"
                            onClick={() => alert(q.query_description)}
                        >
                            Description
                        </button>
                        <button
                            className="open-button open-button-chat"
                            onClick={() => {
                                localStorage.setItem("query_id", q.id);
                                window.location.href = `http://localhost:5173/chat/${q.id}`;
                            }}
                        >
                            Chat
                        </button>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default Open;
