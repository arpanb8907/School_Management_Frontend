import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student Dashboard Card */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Student Dashboard</h2>
          <p className="text-gray-600">Manage student records, attendance, and more.</p>
          <Link
            to="/dashboard/student"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Student Dashboard
          </Link>
        </div>

        {/* Add more dashboard cards here */}
        
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
          <p className="text-gray-600">Admin section for academic and adminstartion purposes...</p>
          <Link
            to="/dashboard/student"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Admin Dashboard
          </Link>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
