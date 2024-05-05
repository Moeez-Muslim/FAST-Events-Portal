import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import NavComp from '../Navs/NavComp';


const AddEventForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageURL: '',
    dateTime: '',
    totalTickets: '',
    venue: '',
  });

  // State to hold error messages
  const [errors, setErrors] = useState([]);

  // Hook for navigation
  const navigate = useNavigate();

  // Variable to hold the user ID
  const [userId, setUserId] = useState(null);

  // Effect to extract user ID from token
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        setUserId(decoded.userId); // Extract userId and store it in state
      } catch (e) {
        console.error('Invalid token', e);
      }
    } else {
      console.warn('No token found in local storage');
    }
  }, []); // Empty dependency array to run this effect only once when component mounts

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log({userId})
    // Clear previous errors
    setErrors([]);

    // Validate required fields
    const missingFields = [];
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        missingFields.push(key);
      }
    }

    if (missingFields.length > 0) {
      setErrors(missingFields.map((field) => `${field} is required`));
      return;
    }

    try {
      // Make a POST request to the backend
      const response = await axios.post('http://localhost:5555/events', formData);

      // Reset form data if submission is successful
      if (response.status === 201) {

        const eventId = response.data._id; // Get the created event ID

        // Then, associate the event with the organizer
        await axios.post(`http://localhost:5555/organizer/${userId}/events`, {
          eventId,
        });

        setFormData({
          title: '',
          description: '',
          imageURL: '',
          dateTime: '',
          totalTickets: '',
          venue: '',
        });
        setErrors([]); // Clear errors on success
        // Navigate to the /events route
        navigate('/organizer'); // Redirect to a specific route
      }
    } catch (error) {
      setErrors([error.response.data.message || 'An error occurred while creating the event']);
    }
  };

  return (
    <div className="container">
      <NavComp/>
      <br/><br/>
      <h2>Create a New Event</h2>

      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imageURL"
            value={formData.imageURL}
            onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Event Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="dateTime"
            value={formData.dateTime}
            onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Tickets</label>
          <input
            type="number"
            className="form-control"
            name="totalTickets"
            value={formData.totalTickets}
            onChange={(e) => setFormData({ ...formData, totalTickets: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input
            type="text"
            className="form-control"
            name="venue"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />
        </div>

        <div className="d-grid gap-2 col-6 mx-auto my-5">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={handleSubmit}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
