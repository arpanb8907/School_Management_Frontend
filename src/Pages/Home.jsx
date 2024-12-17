import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
 
  const navigate = useNavigate();

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

  export default Home