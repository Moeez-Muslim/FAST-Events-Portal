import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import NavComp from '../Navs/NavComp';
import moment from 'moment';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event details to pre-fill the form
  useEffect(() => {
    axios
      .get(`http://localhost:5555/events/${id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error fetching event details.");
        setLoading(false);
      });
  }, [id]);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5555/events/${id}`, event)
      .then(() => {
        navigate(`/my-event-organized/details/${id}`);
      })
      .catch((err) => {
        console.error(err);
        setError("Error updating event.");
      });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <NavComp />
      <h2>Edit Event</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Event Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dateTime" className="form-label">
            Date & Time
          </label>
          <input
            type="datetime-local"
            className="form-control"
            id="dateTime"
            value={moment(event.dateTime).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => setEvent({ ...event, dateTime: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="venue" className="form-label">
            Venue
          </label>
          <input
            type="text"
            className="form-control"
            id="venue"
            value={event.venue}
            onChange={(e) => setEvent({ ...event, venue: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}
