import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Optional spinner icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

   // Dynamically determine the base URL based on the environment
   const API_BASE_URL =
   process.env.NODE_ENV === "production"
     ? process.env.REACT_APP_PRODUCTION_API_URL
     : process.env.REACT_APP_API_BASE_URL;
  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      console.log(API_BASE_URL)
      return;
    }

    setLoading(true); // Start loader

    const endpoint = role === "admin" ? "/api/admin/login" : "/api/student/login";

    try {
      const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      //const response = await axios.post(`${API_BASE_URL}${endpoint}`,)

      
      const data = await response.json();

      if (response.status !== 200) {
        alert(data.message || "Login failed.");
        setLoading(false); // Stop loader on error
        return;
      }

      // Store the token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      navigate(role === "admin" ? "/dashboard/admin" : "/dashboard/student");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        {loading ? (
          // Loader component
          <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-blue-600 text-4xl mb-4" />
            <p className="text-gray-700">Logging in, please wait...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">
              Login as {role === "admin" ? "Admin" : "Student"}
            </h1>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="role" className="block text-gray-700 mb-2">
                  Select Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </form>
            
              <p className="mt-4">
                Not a {role}?{" "}
                <Link to="/register" className="text-blue-500">
                  Register here
                </Link>
              </p>
            
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
