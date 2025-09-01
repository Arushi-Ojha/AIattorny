import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Chats() {
  const { queryId: paramQueryId } = useParams();
  const queryId = paramQueryId || localStorage.getItem("query_id"); // fallback to localStorage
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("user_id");
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Fetch messages every 2s
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
        // alert("Failed to fetch messages"); // optional
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [queryId]);

  // Send a message
  const sendMessage = async () => {
    if (!text.trim()) return;

    const messageToSend = text; // save current text
    setText(""); // clear input immediately

    try {
      await axios.post("http://localhost:5000/documents/chats", {
        query_id: queryId,
        sender_id: userId,
        message: messageToSend,
      });

      // Optimistically add message to chat UI
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
      setText(messageToSend); // revert input if failed
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, idx) => {
          const isMe = msg.sender_id == userId;
          return (
            <div
              key={idx}
              style={{
                ...styles.message,
                alignSelf: isMe ? "flex-end" : "flex-start",
                backgroundColor: isMe ? "#0b93f6" : "#e5e5ea",
                color: isMe ? "#fff" : "#000",
                borderBottomRightRadius: isMe ? 0 : 15,
                borderBottomLeftRadius: isMe ? 15 : 0,
              }}
            >
              {!isMe && <div style={styles.sender}>{msg.username}</div>}
              <div>{msg.message}</div>
              <div style={styles.time}>
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

      <div style={styles.inputContainer}>
        <textarea
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button style={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    width: "400px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    margin: "20px auto",
  },
  messages: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    backgroundColor: "#f5f5f7",
    zIndex: "10000",
  },
  message: {
    maxWidth: "70%",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "15px",
    position: "relative",
    zIndex:"10000",
  },
  sender: {
    fontSize: "12px",
    marginBottom: "3px",
    fontWeight: "bold",
  },
  time: {
    fontSize: "10px",
    marginTop: "3px",
    textAlign: "right",
  },
  inputContainer: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    resize: "none",
    padding: "10px",
    borderRadius: "15px",
    border: "1px solid #ccc",
    marginRight: "10px",
    fontSize: "14px",
    height: "50px",
  },
  sendButton: {
    padding: "0 15px",
    borderRadius: "15px",
    border: "none",
    backgroundColor: "#0b93f6",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Chats;
