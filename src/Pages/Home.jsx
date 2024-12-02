import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const menuItems = [
    { name: "Attendance", icon: "fas fa-user-check", route: "/attendance" },
    { name: "Class List", icon: "fas fa-list", route: "/class-list" },
    { name: "Timetable", icon: "fas fa-calendar-alt", route: "/timetable" },
    { name: "Exam", icon: "fas fa-edit", route: "/exam" },
    { name: "Calendar", icon: "fas fa-calendar", route: "/calendar" },
    { name: "News", icon: "fas fa-newspaper", route: "/news" },
    { name: "Homework", icon: "fas fa-book", route: "/homework" },
    { name: "Exam Result", icon: "fas fa-chart-line", route: "/exam-result" },
    { name: "Settings", icon: "fas fa-cog", route: "/settings" },
    { name: "Configuration", icon: "fas fa-tools", route: "/configuration" },
  ];

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Access Restricted
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            You need to log in to view the content.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className="text-gray-600 border-2 border-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 border-t border-gray-300">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white w-64 p-6">
        <h1 className="text-3xl font-bold mb-8">SCHOOL</h1>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 p-2 hover:bg-blue-700 rounded-lg cursor-pointer transition"
            >
              <i className={`${item.icon} text-lg`}></i>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ">
        {/* Main Section */}
        <main className="p-6">
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={()=> navigate(item.route)}
                className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition transform hover:scale-105 cursor-pointer"
              >
                <div className="w-12 h-12 mb-3 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <p className="text-gray-700 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
