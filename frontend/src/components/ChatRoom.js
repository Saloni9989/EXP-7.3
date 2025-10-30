import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function ChatRoom({ username }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const msgData = {
        user: username,
        message,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("send_message", msgData);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.user === username ? "own" : "other"
            }`}
          >
            <strong>{msg.user}</strong>: {msg.message}{" "}
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
