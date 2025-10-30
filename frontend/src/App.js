import React, { useState } from "react";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");

  return (
    <div className="App">
      <h1>💬 Real-Time Chat App</h1>
      {!username ? (
        <Login setUsername={setUsername} />
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;
