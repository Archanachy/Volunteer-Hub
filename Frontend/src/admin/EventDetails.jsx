import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import '../Styles/EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    participants: 0,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        const data = await response.json();
        setEvent(data);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setEvent(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details-body">
      <Navbar />
      <div className="event-details-container">
        {isEditing ? (
          <div>
            <h1>Edit Event</h1>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Participants:
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                />
              </label>
              <button type="button" onClick={handleSaveClick}>
                Save
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1>{event.title}</h1>
            <p>Date: {new Date(event.date).toDateString()}</p>
            <p>Description: {event.description}</p>
            <p>Location: {event.location}</p>
            <p>Participants: {event.participants}</p>
            <button onClick={handleEditClick}>Edit Event</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;