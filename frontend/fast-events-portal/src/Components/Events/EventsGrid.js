import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import NavComp from "../Navs/NavComp";

function EventsGrid() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state to track the search term

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/events")
      .then((response) => {
        setEvents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term); // Update the search term
  };

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  // Filter events based on the search term
  const filteredEvents = events.filter((event) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      moment(event.dateTime)
        .format("MMMM Do YYYY, h:mm a")
        .toLowerCase()
        .includes(searchLower)
    );
  });

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <NavComp onSearch={handleSearch} /> {/* Pass the search handler */}
      <h1>Events</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event._id} className="col-sm-4 mb-4">
                <div className="card">
                  <img
                    src={event.imageURL}
                    className="card-img-top"
                    alt={`${event.title}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="card-text">{truncateText(event.description, 10)}</p>
                    <p className="card-text">
                      <strong>Date:</strong> {moment(event.dateTime).format("MMMM Do YYYY, h:mm a")}
                    </p>
                    <Link to={"/events/details/" + event._id} className="btn btn-dark">
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
