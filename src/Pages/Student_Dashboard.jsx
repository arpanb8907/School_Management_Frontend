import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Student_Dashboard() {
  
  const menuItems = [
    { name: "Attendance", icon: "fas fa-user-check", route: "/attendance" },
    { name: "Class List", icon: "fas fa-list", route: "/classlist" },
    { name: "Timetable", icon: "fas fa-calendar-alt", route: "/timetable" },
    { name: "Exam", icon: "fas fa-edit", route: "/exam" },
    { name: "Calendar", icon: "fas fa-calendar", route: "/calendar" },
    { name: "News", icon: "fas fa-newspaper", route: "/news" },
    { name: "Homework", icon: "fas fa-book", route: "/homework" },
    { name: "Fee", icon: "fa fa-inr", route: "/fee-management" },
    { name: "Exam Result", icon: "fas fa-chart-line", route: "/exam-result" },
    { name: "Settings", icon: "fas fa-cog", route: "/settings" },
    { name: "Configuration", icon: "fas fa-tools", route: "/configuration" },
  ];
  const navigate = useNavigate();
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





