import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Chats() {
  const { queryId: paramQueryId } = useParams();
  const queryId = paramQueryId || localStorage.getItem("query_id");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("user_id");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!queryId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/documents/chats/${queryId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [queryId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const messageToSend = text;
    setText("");

    try {
      await axios.post("http://localhost:5000/documents/chats", {
        query_id: queryId,
        sender_id: userId,
        message: messageToSend,
      });
      setMessages((prev) => [
        ...prev,
        {
          sender_id: userId,
          username: "You",
          message: messageToSend,
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
      setText(messageToSend);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chats-container">
      <div className="chats-messages">
        {messages.map((msg, idx) => {
          const isMe = msg.sender_id == userId;
          return (
            <div
              key={idx}
              className={`chats-message ${isMe ? "me" : "other"}`}
            >
              {!isMe && <div className="chats-sender">{msg.username}</div>}
              <div>{msg.message}</div>
              <div className="chats-time">
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chats-input-container">
        <textarea
          className="chats-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button className="chats-send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chats;
