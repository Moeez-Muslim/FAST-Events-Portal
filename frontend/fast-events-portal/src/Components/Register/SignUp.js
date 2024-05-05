import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // To send HTTP requests
import BrandNav from '../Navs/BrandNav';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

export default function SignUp() {
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
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrorMessage(''); // Reset error message

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

  const myStyle = {
    backgroundColor: '#333333', // Dark gray background
    textAlign: 'center',
    color: 'white', // Set text color to white for contrast
  };

  return (
    <div style={myStyle}>
      <BrandNav/>
      <h1 className="fs-1 fw-bold mt-5">Create Your Account</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group col-6 mx-auto">
          <label htmlFor="firstName">First Name:</label>
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
          <label htmlFor="lastName">Last Name:</label>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group col-6 mx-auto">
          <label htmlFor="phoneNumber">Phone Number:</label>
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
          <label htmlFor="dob">Date of Birth:</label>
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
          <label htmlFor="gender">Gender:</label>
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
          <label htmlFor="cnic">CNIC:</label>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-6 mx-auto">
          <label htmlFor="isOrganizer">Are You an Organizer?</label>
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
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-outline-light">Sign Up</button>
          <Link to="/" className="btn btn-dark">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
