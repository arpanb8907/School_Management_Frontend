import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiMessageSquare } from "react-icons/fi";
import ChatWindow from "../Pages/ChatWindow";
import ChatList from "../Pages/ChatList";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const unreadmessages = 7;

  const usersMock = [
    {
      id: 1,
      name: "Alan Byrd",
      profilePic: "https://via.placeholder.com/40",
      latestMessage: "Really? That's great. We will do it tomorrow.",
      time: "2:30pm",
    },
    {
      id: 2,
      name: "Wanda Dean",
      profilePic: "https://via.placeholder.com/40",
      latestMessage: "Wowaa, so beautiful. Where did you buy this dress?",
      time: "11:37am",
    },
    {
      id: 3,
      name: "Joshua Perez",
      profilePic: "https://via.placeholder.com/40",
      latestMessage: "I'll try to answer all of your questions after this...",
      time: "2:30pm",
    },
    {
      id: 4,
      name: "2/4/6 Badminton",
      profilePic: "https://via.placeholder.com/40",
      latestMessage: "We need to win next game to get a ticket...",
      time: "2:30pm",
    },
    {
      id: 5,
      name: "Mr Carey",
      profilePic: "https://via.placeholder.com/40",
      latestMessage: "I'll try to answer all of your questions after this...",
      time: "2:30pm",
    },
    {
      id: 6,
      name: "Dr Roy",
      profilePic: "https://via.placeholder.com/40",
      latestMessage: "I'll try to answer all of your questions after this...",
      time: "2:30pm",
    },
  ];

  const token = localStorage.getItem("token");
  let uname = "Guest";

  if (token) {
    let decoded = jwtDecode(token);
    uname = decoded.username;
  }

  const user = {
    name: uname,
    profilePic: "https://via.placeholder.com/40",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-300 p-4 text-gray-900 flex justify-between items-center shadow border-b border-gray-400 relative">
      {/* Navigation Links with Messaging Icon */}
      <ul className="flex space-x-6 items-center">
        <li>
          <NavLink
            to="/"
            className="relative group cursor-pointer text-gray-800 font-medium hover:text-blue-600 transition duration-300"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        </li>

        {/* Messaging Icon */}
        {uname !== "Guest" && (
          <li>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shadow-md hover:bg-blue-400 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              title="Messages"
            >
              <FiMessageSquare
                size={20}
                className="text-gray-700 transition-colors duration-300"
              />
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
                {unreadmessages}
              </span>
            </button>
          </li>
        )}
      </ul>

      {/* Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="hidden md:block">{user.name}</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-48">
            {uname === "Guest" ? (
              <NavLink
                to="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>

      {/* Chat List Overlay */}
      {isChatOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white shadow-lg rounded-lg z-50">
          {!selectedUser ? (
            <ChatList users={usersMock} onSelectUser={setSelectedUser} CurrentUser = {setCurrentUser} />
          ) : (
            <ChatWindow
              isChatOpen={true}
              setIsChatOpen={() => setSelectedUser(null)}
              //selectedUser={selectedUser}
              currentUser = {currentUser}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
