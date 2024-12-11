import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [fname, setFname] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student'); // Default role as 'student'
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { name, fname, contact, address, password, email, role };

    try {
      // API endpoint changes based on the role
      const endpoint = role === 'admin' ? '/api/admin/register' : '/api/student/register';

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert(`${role==='admin'?"Admin" : "Student"} Registration successful`);
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-form p-4 border border-gray-300 rounded-md w-96 mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Register as {role === 'admin' ? 'Admin' : 'Student'}
      </h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 mb-2">Select Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="fathersName"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Father's Name"
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="phoneNumber"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone Number"
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            name="address"
            placeholder="Address"
            className="border p-2 w-full"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
          Register
        </button>
      </form>

      <p className="mt-4">
        Already registered?{' '}
        <Link to="/login" className="text-blue-500">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
