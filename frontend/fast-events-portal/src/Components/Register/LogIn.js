import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BrandNav from '../Navs/BrandNav';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LogIn() {
  // Background style with blur and brightness adjustment
  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: 'blur(5px) brightness(50%)', // Blur and reduce brightness
    position: 'absolute', // Keep the background at the base
    zIndex: 0, // Behind other elements
  };

  // Content style with a clear background
  const contentStyle = {
    position: 'relative', // On top of the blurred background
    zIndex: 1, // Ensure content is above the background
    padding: '20px', // For some spacing
    textAlign: 'center'
  };

  const [CNIC, setCNIC] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:5555/login', { CNIC, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      navigate('/events');
    } catch (error) {
      setErrorMessage('Invalid CNIC or password. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Blurred background */}
      <div style={backgroundStyle}></div>

      {/* Content container */}
      <div style={contentStyle}>
        <BrandNav />
        <br /><br /><br />
        <h1 className='fs-1 text-white fw-bold'>Book Your Events</h1>
        <p className='text-white mx-auto' style={{ width: '60%' }}>
          Welcome to FAST Events, your go-to partner for creating unforgettable experiences.
          <br /> Let's make it extraordinary together.
        </p>
        <br /><br />
        <form onSubmit={handleLogin}>
          <div className="form-group col-6 mx-auto">
            <label className='text-white' htmlFor="CNIC">CNIC</label>
            <input
              type="text"
              className="form-control"
              id="CNIC"
              value={CNIC}
              onChange={(e) => setCNIC(e.target.value)}
            />
          </div>
          <div className="form-group col-6 mx-auto">
            <label className='text-white' htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className='text-danger'>{errorMessage}</p>}
          <div className="d-grid gap-2 col-6 mx-auto mt-3">
            <button type="submit" className="btn btn-outline-light">LogIn</button>
            <Link to="/signup" className="btn btn-dark">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
