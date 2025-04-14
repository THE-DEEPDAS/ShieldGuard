import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Messaging.css";

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function Messaging() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.to === username || newMessage.from === username) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });
  }, [username]);

  const handleSignup = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please log in.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        fetchMessages();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/message/get?username=${username}`
      );
      const data = await response.json();
      if (response.ok) {
        setMessages(data.messages);
        const uniqueChats = Array.from(
          new Set(
            data.messages.map((msg) =>
              msg.from === username ? msg.to : msg.from
            )
          )
        );
        setChatList(uniqueChats);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMessages([]);
    setMessage("");
    setReceiver("");
    setChatList([]);
  };

  const sendMessage = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: receiver, from: username, message }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        socket.emit("sendMessage", data.message);
        setMessages((prev) => [...prev, data.message]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <h2>Messaging Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
      </div>
    );
  }

  return (
    <div className="messaging-container">
      <div className="header">
        <h2>Secure Messaging</h2>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div className="chat-list">
        <h3>Chats</h3>
        {chatList.map((chatUser, index) => (
          <div
            key={index}
            className={`chat-user ${receiver === chatUser ? "active" : ""}`}
            onClick={() => setReceiver(chatUser)}
          >
            {chatUser}
          </div>
        ))}
      </div>

      <div className="receiver-input">
        <input
          type="text"
          placeholder="Enter receiver username"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>

      <div className="messages">
        {messages
          .filter((msg) => msg.to === receiver || msg.from === receiver)
          .map((msg, index) => (
            <div
              key={index}
              className={msg.from === username ? "sent" : "received"}
            >
              <span>{msg.from === username ? "You" : msg.from}</span>:{" "}
              {msg.message}
            </div>
          ))}
      </div>

      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
