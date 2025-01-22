import React, { useState } from "react";

export default function ChatWindow({ isChatOpen, setIsChatOpen,currentUser }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: currentUser.name, text: "Hello!" },
    { sender: "You", text: "Hi, how can I help you?" },
  ]);

  const handleSendMessage = () => {
    //alert(`${currentUser.name}`)
    if (message.trim() !== "") {
      setMessages([...messages, { sender: "You", text: message }]);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    isChatOpen && (
      <div
        className="chat-window fixed bottom-16 right-5 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col z-50"
        style={{ zIndex: 50 }} // Ensure chat window stays above other content
      >
        {/* Chat Header */}
        <div className="chat-header flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <h3 className="text-lg font-semibold">{currentUser.name}</h3>
          <button
            onClick={() => setIsChatOpen(false)}
            className="text-white hover:text-gray-300"
          >
            ✖
          </button>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === "You" ? "text-right" : ""}`}
            >
              <span
                className={`text-sm ${
                  msg.sender === "You" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {msg.sender}:
              </span>
              <p
                className={`${
                  msg.sender === "You"
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200"
                } rounded-lg inline-block p-2 mt-1 text-sm shadow`}
              >
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input border-t bg-white p-3 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full border rounded-l-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white flex justify-center items-center rounded-full shadow-lg hover:from-blue-400 hover:to-blue-500 active:scale-95 transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12L2 3l7 9-7 9 19-9z"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
}
