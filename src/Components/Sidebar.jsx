import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="w-64 h-screen bg-gray-900 text-white fixed">
    <div className="p-4 text-lg font-bold border-b border-gray-700">
      School Management
    </div>
    <ul className="mt-4">
      <li>
        <NavLink
          to="/dashboard"
          className="block py-2 px-4 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-students"
          className="block py-2 px-4 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Manage Students
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-teachers"
          className="block py-2 px-4 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Manage Teachers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-classes"
          className="block py-2 px-4 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Manage Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/attendance"
          className="block py-2 px-4 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Attendance
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/assignments"
          className="block py-2 px-4 hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Assignments
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Sidebar;
