import React, { useEffect, useState } from "react";
import axios from "axios";

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
        <div>
            <h2>Public Queries</h2>
            {queries.map((q) => (
                <div key={q.id} className="query-card">
                    <h4>{q.query_topic}</h4>
                    <p>Asked by: {q.username}</p>
                    <button onClick={() => alert(q.query_description)}>Description</button>
                    <button
                        onClick={() => {
                            localStorage.setItem("query_id", q.id); // save query id
                            window.location.href = `http://localhost:5173/chat/${q.id}`;
                        }}
                    >
                        Chat
                    </button>

                </div>
            ))}
        </div>
    );
}

export default Open;
