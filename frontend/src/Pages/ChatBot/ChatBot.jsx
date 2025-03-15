import React, { useState, useRef, useEffect } from "react";
import Header from "../Home/Header/Header";
import { getChatResponse } from "../../services/gemini.service";

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
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="bg-[#042439] text-white p-4">
          <h1 className="text-xl font-bold">Mental Health Support Chat</h1>
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-white"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-lg p-3">Thinking...</div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#042439] text-white px-4 py-2 rounded hover:bg-[#0D199D] disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
