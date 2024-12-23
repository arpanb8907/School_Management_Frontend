import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Student_Dashboard from "./Pages/Student_Dashboard";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";
import Homework from "./Home_Items/Homework";
import ClassList from "./Home_Items/ClassList";
import Homework_admin from "./Pages/Homework_admin";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const publicPaths = ["/login", "/register"];
    //&& !publicPaths.includes(window.location.pathname)
    if (!token ) {
      // If no token and not on public page, redirect to /login
      navigate("/login");
    } else if (token) {
      // If token exists, navigate based on role
      if (role === "admin" && window.location.pathname !== "/dashboard/admin") {
        navigate("/dashboard/admin");
      } else if (role !== "admin" && window.location.pathname !== "/dashboard/student") {
        navigate("/dashboard/student");
      }
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content will take all available space */}
      <div className="flex-grow">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/student" element={<Student_Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Homework" element={<Homework />} />
          <Route path="/ClassList" element={<ClassList />} />
          <Route path="/dashboard/admin" element={<Homework_admin />} />
        </Routes>
      </div>
      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
