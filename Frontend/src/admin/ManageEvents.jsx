import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminNavbar from '../Components/AdminNavbar';
import '../Styles/ManageEvents.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    participants: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleViewEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
      const data = await response.json();
      setEvents(prev => [...prev, data]);
      setShowCreateForm(false);
      setNewEvent({
        title: '',
        date: '',
        description: '',
        location: '',
        participants: 0
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="manage-events-body">
      <AdminNavbar />
      <div className="manage-events-container">
        <div className="manage-events-header">
          <h1>Manage Events</h1>
          <motion.button
            className="create-event-button"
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowCreateForm(true)}
          >
            Create New Event
          </motion.button>
        </div>

        {showCreateForm && (
          <div className="create-event-modal">
            <div className="create-event-content">
              <h2>Create New Event</h2>
              <form onSubmit={handleCreateEvent}>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date:</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Maximum Participants:</label>
                  <input
                    type="number"
                    name="participants"
                    value={newEvent.participants}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>
                <div className="form-actions">
                  <motion.button
                    type="submit"
                    className="submit-button"
                    whileHover={{ scale: 1.05 }}
                  >
                    Create Event
                  </motion.button>
                  <motion.button
                    type="button"
                    className="cancel-button"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="events-list">
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="event-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <h2>{event.title}</h2>
              <p>Date: {new Date(event.date).toDateString()}</p>
              <div className="event-actions">
                <motion.button
                  className="cta-button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleViewEvent(event.id)}
                >
                  View Event
                </motion.button>
                <motion.button
                  className="cta-button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;