import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data (replace with real user data)
  const user = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/40", // Replace with actual user profile picture URL
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page
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
    <nav className="bg-blue-300 p-4 text-gray-900 flex justify-between items-center shadow border-b border-gray-400">


      {/* Navigation Links */}
      <ul className="flex space-x-4">
        <li>
          <NavLink
            to="/"
            className="cursor-pointer hover:underline"
            activeClassName="font-bold underline"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className="cursor-pointer hover:underline"
            activeClassName="font-bold underline"
          >
            Dashboard
          </NavLink>
        </li>
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
            <NavLink
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Dashboard
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
