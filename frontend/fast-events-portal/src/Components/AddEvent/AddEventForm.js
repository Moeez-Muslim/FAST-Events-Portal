import React, { Component } from 'react'
import PropTypes from 'prop-types';
import NavComp from '../NavComp'


export class AddEventForm extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
      <NavComp/>
        <div className="container mt-5" id="add-card-container">
            <h2>Create New Event</h2>
            <form id="add-card-form">
                <div className="mb-3">
                    <label for="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" required/>
                </div>
                <div className="mb-3">
                    <label for="time" className="form-label">Time</label>
                    <input type="time" className="form-control" id="time" required/>
                </div>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" required/>
                </div>
                <div className="mb-3">
                    <label for="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="3" required></textarea>
                </div>
                <div className="mb-3">
                    <label for="event" className="form-label">Event</label>
                    <input type="text" className="form-control" id="event" required/>
                </div>
                <div className="mb-3">
                    <label for="nearest-place" className="form-label">Nearest Place</label>
                    <input type="text" className="form-control" id="nearest-place" required/>
                </div>
                <div className="mb-3">
                    <label for="image-url" className="form-label">Upload Image</label>
                    <input type="file" className="form-control" id="image-url"/>
                </div>
                <button type="submit" className="btn btn-primary">Add Card</button>
            </form>
        </div>
      </div>
    )
  }
}


export default AddEventForm;
