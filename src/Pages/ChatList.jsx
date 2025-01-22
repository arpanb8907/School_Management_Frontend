import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ChatList = ({ users, onSelectUser,CurrentUser }) => {
  const [searchUser, setSearchUser] = useState("");

  const handleSearch = (e) => {
    setSearchUser(e.target.value);
  };

  const filteredUser = users.filter((user) => {
    return user.name.toLowerCase().includes(searchUser.toLowerCase());
  });
  return (
    <div className="chat-list bg-white shadow-md rounded-lg w-80 h-[500px] flex flex-col">
      {/* Header */}
      <div className="header bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 text-lg font-semibold">
        Messages
      </div>

      <div className="relative">
        <input
          type="text"
          className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search people"
          value={searchUser}
          onChange={handleSearch}
        />
        <FaSearch className="absolute top-3 left-3 text-gray-500" />
      </div>
      {/* User List with Scrollbar */}
      <ul className="overflow-y-auto flex-1">
        {filteredUser.length === 0 ? (
          <p className="text-gray-600">No students found</p>
        ) : (
          filteredUser.map((user) => (
            <li
              key={user.id}
              className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelectUser(user)
                CurrentUser(user)
              }}
            >
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="text-gray-800 font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {user.latestMessage}
                </p>
              </div>
              <div className="text-xs text-gray-400">{user.time}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ChatList;
