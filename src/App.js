import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Student_Dashboard from './Pages/Student_Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Footer from './Components/Footer';

const App = () => (
  <Router>
    {/* Main container with flexbox */}
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content will take all available space */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/student" element={<Student_Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  </Router>
);

export default App;
