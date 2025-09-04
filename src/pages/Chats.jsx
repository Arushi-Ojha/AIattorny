import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Frame from "./Frame";

function Chats() {
  const { queryId: paramQueryId } = useParams();
  const queryId = paramQueryId || localStorage.getItem("query_id");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Decide whether current sender is a user or a lawyer
  const userId = localStorage.getItem("user_id");
  const lawyerId = localStorage.getItem("lawyer_id");

  const senderId = userId || lawyerId; // whichever exists
  const senderType = userId ? "user" : "attorney";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!queryId) return;

    const fetchMessages = async () => {
  try {
    const res = await axios.get(
      `https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/documents/chats/${queryId}/${senderId}`
    );

    const sorted = res.data.chats.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    setMessages(sorted);
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
      await axios.post("https://c5ncaxcfy75src72lftiertdgm0wvqiy.lambda-url.ap-southeast-2.on.aws/documents/chats", {
        query_id: queryId,
        sender_id: senderId,      // ✅ dynamic id
        sender_type: senderType,  // ✅ "user" or "attorney"
        message: messageToSend,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender_id: senderId,
          sender_type: senderType,
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
    <>
      <Frame />
      <div className="chats-container">
        <div className="chats-messages">
          {messages.map((msg, idx) => {
            const isMe = msg.sender_id == senderId && msg.sender_type === senderType;
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
    </>
  );
}

export default Chats;
