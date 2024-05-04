import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavComp from '../Navs/NavComp';

function EventsGrid() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/events')
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const truncateText = (text, limit) => {
    // Get the first 10 words of the description
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <NavComp/>
      <h1>Events</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {events && events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="col-sm-4 mb-4">
                <div className="card">
                  {/* Display the image at the top of the card */}
                  <img
                    src={event.imageURL}
                    className="card-img-top"
                    alt={`${event.title}`}
                  />

                  {/* Event details in the card body */}
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>

                    {/* Display truncated description */}
                    <p className="card-text">{truncateText(event.description, 10)}</p>

                    {/* Display date and time */}
                    <p className="card-text">
                      <strong>Date:</strong> {moment(event.dateTime).format('MMMM Do YYYY, h:mm a')}
                    </p>

                    <Link to={'/events/details/' + event._id} className="btn btn-dark">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <h3>No Events Found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EventsGrid;
