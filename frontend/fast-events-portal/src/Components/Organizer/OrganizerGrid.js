import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import NavComp from '../Navs/NavComp';
import { jwtDecode } from 'jwt-decode';

function OrganizerGrid() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize as true for loading state

  // Extract the userId from the JWT token
  const getUserId = () => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token
        return decoded.userId; // Return the userId from the token
      } catch (e) {
        console.error('Error decoding token:', e); // Handle decoding error
        return null;
      }
    } else {
      console.warn('No token found in local storage');
      return null;
    }
  };

  // Use the extracted userId to fetch the organizer's events
  useEffect(() => {
    const userId = getUserId(); // Get the userId
    if (userId) {
      axios
        .get(`http://localhost:5555/organizer/${userId}/events`) // Use the userId to form the URL
        .then((response) => {
          setEvents(response.data.data); // Set the events state with the fetched data
          setLoading(false); // Stop loading after data is fetched
        })
        .catch((error) => {
          console.error('Error fetching events:', error);
          setLoading(false); // Stop loading if there's an error
        });
    }
  }, []); // Empty dependency array, so this runs only once when the component mounts

  const truncateText = (text, limit) => {
    const words = text.split(' '); // Split the text into words
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text; // Truncate text if necessary
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <NavComp /> {/* Navigation component */}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h2>Events Organized</h2>
        <Link to="/create-event" className="btn btn-dark">Create Event</Link> {/* Link to create a new event */}
      </div>

      {loading ? (
        <Spinner /> 
      ) : (
        <div className="row mt-5">
          {events && events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="col-sm-4 mb-4">
                <div className="card">
                  <img
                    src={event.imageURL}
                    className="card-img-top"
                    alt={event.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{truncateText(event.description, 10)}</p>
                    <p className="card-text">
                      <strong>Date:</strong> {moment(event.dateTime).format('MMMM Do YYYY, h:mm a')}
                    </p>
                    <Link to={`/events/details/${event._id}`} className="btn btn-dark">
                      Details
                    </Link> {/* Link to event details */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 mt-5">
              <h3>No Events Found</h3> {/* Display if no events are found */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrganizerGrid;
