import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BrandNav from '../Navs/BrandNav';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignUp() {
  const backgroundStyle = {
    backgroundImage: "url('https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    height: "150vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    filter: 'blur(5px) brightness(50%)', // Apply blur and lower brightness
    position: 'absolute', // Keep the background at the base
    zIndex: 0, // Behind other elements
  };

  const contentStyle = {
    position: 'relative', // On top of the blurred background
    zIndex: 1,
    padding: '20px',
    textAlign: 'center', // Center-align the content
    color: 'white', // Ensure text is light for readability
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    gender: 'Male', // Default gender
    cnic: '',
    isOrganizer: false, // Default value for the organizer switch
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5555/signup', formData);

      if (response.status === 201) {
        navigate('/'); // Redirect to login on success
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data.error); // Show specific error message
      } else {
        setErrorMessage('An error occurred during signup. Please try again.');
      }
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={backgroundStyle}></div>

      <div style={contentStyle}>
        <BrandNav />
        <h1 className="fs-1 fw-bold mt-5">Create Your Account</h1>
        <form onSubmit={handleSignUp}>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="firstName" className="text-white">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="lastName" className="text-white">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="email" className="text-white">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="phoneNumber" className="text-white">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="dob" className="text-white">Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="gender" className="text-white">Gender:</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="cnic" className="text-white">CNIC:</label>
            <input
              type="text"
              className="form-control"
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-6 mx-auto">
            <label htmlFor="password" className="text-white">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="form-group col-6 mx-auto mt-2">
            <label htmlFor="isOrganizer" className="text-white">Are You an Organizer?</label>
            <input
              type="checkbox"
              className="form-check-input"
              id="isOrganizer"
              name="isOrganizer"
              checked={formData.isOrganizer}
              onChange={handleChange}
            />
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <div className="d-grid gap-2 col-6 mx-auto mt-3">
            <button type="submit" className="btn btn-outline-light">Sign Up</button>
            <Link to="/" className="btn btn-dark">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
