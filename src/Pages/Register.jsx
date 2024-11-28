import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

  const [name,setname] = useState('');
  const [fname,setfname] = useState('');
  const [contact,setcontact] = useState('');
  const [address,setaddress] = useState('');
  const [password,setpassword] = useState('');
  const [email,setemail] = useState(''); 

  const handleRegister = (e)=>{
    e.preventDefault()

        localStorage.setItem('authtoken','001');
        window.location.reload()
  }

  return (
    <div className="register-form p-4 border border-gray-300 rounded-md w-96 mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Register for a Student</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="fathersName"
            value={fname}
            onChange={(e)=>setfname(e.target.value)}
            placeholder="Father's Name"
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
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
            onChange={(e)=>setpassword(e.target.value)}
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
            onChange={(e)=>setcontact(e.target.value)}
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
            onChange={(e)=>setaddress(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
          Register
        </button>
      </form>

      <p className="mt-4">
        Already a student? <Link to="/login" className="text-blue-500">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
