import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // To send HTTP requests
import BrandNav from '../Navs/BrandNav';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included


export default function LogIn() {
  const myStyle = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    height: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    textAlign: 'center',
  };

  const [CNIC, setCNIC] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate to change routes


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(''); // Reset error message

    try {
      const response = await axios.post('http://localhost:5555/login', { CNIC, password });
      const { token } = response.data;

      // Store the token in local storage for further use
      localStorage.setItem('token', token);

      // Navigate to the events page after successful login
      navigate('/events');
    } catch (error) {
      // Set error message if login fails
      setErrorMessage('Invalid CNIC or password. Please try again.');
    }
  };

  return (
    <div style={myStyle}>
      <BrandNav />
      <br /><br /><br />
      <h1 className='fs-1 text-white fw-bold mt-5'>Book Your Events</h1>
      <p className='text-white mx-auto mb-5' style={{ width: '60%' }}>
        Welcome to FAST Events, your go-to partner for creating unforgettable experiences.
        <br /> Let's make it extraordinary together.
      </p>
      <br /><br />
      <form onSubmit={handleLogin}>
        <div className="form-group col-6 mx-auto">
          <label className='text-white' htmlFor="CNIC">CNIC:</label>
          <input
            type="text"
            className="form-control"
            id="CNIC"
            value={CNIC}
            onChange={(e) => setCNIC(e.target.value)}
          />
        </div>
        <div className="form-group col-6 mx-auto">
          <label className='text-white' htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-outline-light">LogIn</button>
          <Link to="/signup" className="btn btn-dark">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
