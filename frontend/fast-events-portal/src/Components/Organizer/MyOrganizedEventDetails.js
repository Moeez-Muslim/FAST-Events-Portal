import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Spinner from '../Spinner';
import NavComp from '../Navs/NavComp';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function MyOrganizedEventDetails() {
  const [event, setEvent] = useState(null); // Initialize event as null
  const [loading, setLoading] = useState(true); // Start in loading state
  const [error, setError] = useState(null); // To handle potential errors
  const [success, setSuccess] = useState(null); // To handle success message
  const { id } = useParams(); // Get the event ID from the route parameters
  const navigate = useNavigate(); // Initialize navigate function

  const handleDeletion = async () => {
    setLoading(true);
  
    try {
      // Attempt to delete the event from the first endpoint
      const response1 = await axios.delete(`http://localhost:5555/events/${id}`);
      
      if (response1.status >= 200 && response1.status < 300) {
        // If the first deletion is successful, proceed to the second endpoint
        const response2 = await axios.delete(`http://localhost:5555/organizer/events/${id}`);
        
        if (response2.status >= 200 && response2.status < 300) {
          setSuccess("Event deleted successfully.");
          setTimeout(() => {
            navigate('/organizer'); // Navigate back after a successful delete
          }, 1000);
        } else {
          // If the second deletion fails, provide a more detailed error message
          setError("Error deleting event from organizers. Please try again.");
        }
      } else {
        setError("Error deleting event from the main event list. Please try again.");
      }
    } catch (err) {
      console.error("Deletion error:", err);
      setError("An error occurred while deleting the event. Please try again.");
    } finally {
      setLoading(false); // Always stop loading regardless of the outcome
    }
  };
  

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

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If event is successfully fetched, render the content
  if (event) {
    const availableTickets = event.totalTickets - event.registered.length;

    return (
      <div className="container-fluid" style={{ textAlign: 'center' }}>
        <NavComp />
        {loading ? (
          <Spinner />
        ) : (
          <div className="container-fluid" style={{ textAlign: 'center' }}>
            {/* Carousel with a fixed height */}
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ height: carouselHeight }}
            >
              <div className="carousel-inner" style={{ height: '100%' }}>
                <div class="carousel-item active">
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
              <p>
                <strong>Date & Time:</strong> {moment(event.dateTime).format('MMMM Do YYYY, h:mm a')}
              </p>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Tickets Available:</strong> {availableTickets}
              </p>
            </div>

            <div className="d-grid gap-2 col-6 mx-auto my-5">
              <Link
                to={`/organizer/edit-event/${id}`}
                className="btn btn-outline-dark"
              >
                Edit Event
              </Link>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleDeletion}
              >
                Delete Event
              </button>
              {success && <div className="alert alert-success">{success}</div>}
            </div>
          </div>
        )}
      </div>
    );
  }

  // If there's no event and no error, show loading spinner
  return <Spinner />;
}
