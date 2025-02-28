import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import '../Styles/ManageEvents.css';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
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

  return (
    <div className="manage-events-body">
      <Navbar />
      <div className="manage-events-container">
        <h1>Manage Events</h1>
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