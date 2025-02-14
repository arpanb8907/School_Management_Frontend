import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export default function ChatWindow({
  isChatOpen,
  setIsChatOpen,
  currentUser,
  loggedInuser,
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_API_URL
      : process.env.REACT_APP_API_BASE_URL;

  const socket = io(`${API_BASE_URL}`);

  useEffect(() => {
    if (!loggedInuser || !currentUser) return;

    console.log(`${loggedInuser.name} && ${currentUser.name}`);

    const fetch_prev_messages = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/messages?sender=${loggedInuser.name}&receiver=${currentUser.name}`
        );

        if (response.status !== 200) {
          alert(`${response.status} no messages found`);
          return;
        }
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch_prev_messages();

    // current logged in user joins the socket for continious event emission
    socket.emit("joinRoom", loggedInuser.name);

    // also loggedin user will continously listens for event that passes from server
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage"); // Cleanup listener on unmount
    };
  }, [currentUser, loggedInuser]);

  const handleSendMessage = async () => {
    //alert(`${loggedInuser.name}`);

    if (message.trim() !== "") {
      const newMessage = {
        sender: loggedInuser.name,
        receiver: currentUser.name,
        text: message,
      };

      try {
        // sent event to the server via web socket
        socket.emit("sendMessage", newMessage);

        // save message into the databse via REST API

        const response = await axios.post(
          `${API_BASE_URL}/api/messages`,
          newMessage
        );

        if (response.status === 201) {
          console.log("Message saved:", response.data);
          setMessages((prev) => [...prev, response.data]);
        } else {
          alert("Unable to sent message check your internet connection");
        }
      } catch (error) {
        console.error(error);
      }

      setMessage(""); // clear the input after message sending
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
              className={`flex mb-2 ${
                msg.sender === loggedInuser.name
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === loggedInuser.name
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } rounded-lg p-2 text-sm shadow max-w-xs`}
              >
                <span className="text-xs font-semibold block mb-1">
                  {msg.sender}
                </span>
                <p>{msg.text}</p>
              </div>
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
