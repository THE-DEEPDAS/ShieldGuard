import React, { useState, useRef, useEffect } from "react";
import Header from "../Home/Header/Header";
import { getChatResponse } from "../../services/gemini.service";
import "./ChatBot.css"; // Import the new CSS file

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
    };

    let updatedMessages = [...messages, userMessage];

    // Add initial welcome message if it's the first user message
    if (messages.length === 0) {
      updatedMessages = [
        userMessage,
        {
          role: "assistant",
          content: `Hello! I'm your mental health support assistant. I'm here to listen and provide support for any mental health concerns you'd like to discuss. Please remember that I'm not a replacement for professional help, but I can offer support and information about mental health topics. How are you feeling today?`,
        },
      ];
    }

    setMessages(updatedMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await getChatResponse(updatedMessages);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error. If you need immediate help, please contact emergency services or a mental health crisis line.",
        },
      ]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Header />
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h1>Mental Health Support Chat</h1>
        </div>
        <div ref={chatContainerRef} className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-message ${
                msg.role === "user" ? "user-message" : "assistant-message"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="assistant-message">Thinking...</div>}
        </div>
        <form onSubmit={handleSubmit} className="chatbot-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
