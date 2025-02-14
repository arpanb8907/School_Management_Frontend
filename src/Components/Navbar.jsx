import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FiMessageSquare } from "react-icons/fi";
import ChatWindow from "../Pages/ChatWindow";
import ChatList from "../Pages/ChatList";
import axios from "axios";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatListOpen, toggleChatList] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInuser, setLoggedInuser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [userslist, setUserslist] = useState();
  const unreadmessages = 7;
  const [uname, setUname] = useState("Guest");
  const [isloggedIn, setIsloggedIn] = useState(false);

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_API_URL
      : process.env.REACT_APP_API_BASE_URL;

  const openchatwindow = () => {
    setIsChatOpen(!isChatOpen);
    toggleChatList(!isChatListOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(`User is logged in with username ${decoded.username}`);
        setUname(decoded.username); // Correctly set the username
        setIsloggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setUname("Guest"); // Fallback in case of decoding errors
      }
    } else {
      setUname("Guest");
      setIsloggedIn(false);
    }
  }, [[localStorage.getItem("token")]]);

  useEffect(() => {
    if (uname !== "Guest") {
      const fetch_userlist = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/userslist`);

          if (response.status !== 200) {
            alert(`${response.status} no user found`);
          }

          const formattedUsers = response.data.map((user) => ({
            id: user._id,
            name: user.name,
            profilePic: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk", // Replace with actual profilePic URL if available
            latestMessage: "", // Can be populated from another API call
            time: "Just now", // Placeholder for the latest message time
          }));
          console.log(formattedUsers);
          setUserslist(formattedUsers);
        } catch (error) {
          console.log(`error while fetching details`);
        }
      };

      fetch_userlist();
      setLoggedInuser({
        name: uname,
        profilePic: "https://via.placeholder.com/40",
      });
    }
  }, [uname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsloggedIn(false)
    setUname('Guest')
    //window.location.reload();
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
              onClick={openchatwindow}
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
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <span className="hidden md:block">{uname}</span>
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
      {isChatListOpen && (
        <div className="fixed top-16 right-4 w-80 bg-white shadow-lg rounded-lg z-50">
          {!selectedUser ? (
            <ChatList
              users={userslist}
              onSelectUser={setSelectedUser}
              CurrentUser={setCurrentUser}
              toggleChatList={toggleChatList}
            />
          ) : (
            <ChatWindow
              isChatOpen={true}
              setIsChatOpen={() => setSelectedUser(null)}
              //selectedUser={selectedUser}

              currentUser={currentUser}
              loggedInuser={loggedInuser}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
