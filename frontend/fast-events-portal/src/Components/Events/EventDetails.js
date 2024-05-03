import { useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function EventDetails() {
  const [event, setEvent] = useState(null); // Initialize event as null
  const [loading, setLoading] = useState(true); // Start in loading state
  const [error, setError] = useState(null); // To handle potential errors
  const { id } = useParams(); // Get the event ID from the route parameters

  // Fetch event details from the server
  useEffect(() => {
    axios
      .get(`http://localhost:5555/events/${id}`)
      .then((response) => {
        setEvent(response.data); // Set the event data
        setLoading(false); // End loading state
      })
      .catch((err) => {
        console.error(err); // Log the error
        setError("Error fetching event details."); // Set the error state
        setLoading(false); // End loading state
      });
  }, [id]); // Dependency on ID

  // Fixed height for the carousel
  const carouselHeight = '50vh';


  // If event is successfully fetched, render the content
  if (event) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
          { loading ? (<Spinner/>
        ) : (
          <div className="container" style={{ textAlign: 'center' }}>
            {/* Carousel with a fixed height */}
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ height: carouselHeight }}
            >
              <div className="carousel-inner" style={{ height: '100%' }}>
                <div className="carousel-item active">
                  <img
                    src={event.imageURL}
                    className="d-block w-100"
                    alt={event.title}
                    style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
                {/* Additional slides with the same image */}
                <div className="carousel-item">
                  <img
                    src={event.imageURL}
                    className="d-block w-100"
                    alt={event.title}
                    style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={event.imageURL}
                    className="d-block w-100"
                    alt={event.title}
                    style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              </div>

              {/* Carousel navigation controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            {/* Event Details */}
            <div className="container mt-4">
              <h2>{event.title}</h2>
              <p><strong>Date & Time:</strong> {moment(event.dateTime).format('MMMM Do YYYY, h:mm a')}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Tickets Available:</strong> {event.ticketsAvailable}</p>
              
              {/* List of organizers */}
              {event.organizers && event.organizers.length > 0 && (
                <div>
                  <strong>Organizers:</strong>
                    {event.organizers.map((organizer, index) => (
                      <span key={index}> {organizer}, </span>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      
    );
  }
}
