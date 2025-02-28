import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Styles/VolunteerOpportunities.css';
import Navbar from '../Components/Navbar';

const VolunteerOpportunities = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [signedUp, setSignedUp] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false);

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

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleSignUp = () => {
    setSignedUp(true);
    setTimeout(() => {
      navigate('/volunteer-dashboard');
    }, 2000); // Redirect after 2 seconds
  };

  const toggleFilter = () => {
    setFilterExpanded(!filterExpanded);
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="volunteer-opportunities-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Volunteer Opportunities
        </motion.h1>
        <motion.div
          className="volunteer-opportunities-filter-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button
            onClick={toggleFilter}
            className="volunteer-opportunities-filter-button"
            whileHover={{ scale: 1.1 }}
          >
            {filterExpanded ? 'Hide Filters' : 'Show Filters'}
          </motion.button>
          {filterExpanded && (
            <motion.div
              className="volunteer-opportunities-filter-options"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Add filter options here */}
              <p>Filter options go here...</p>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          className="volunteer-opportunities-event-cards"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="volunteer-opportunities-event-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
              onClick={() => handleEventClick(event.id)}
            >
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {event.title}
              </motion.h2>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Date: {new Date(event.date).toDateString()}
              </motion.p>
              <motion.button
                className="volunteer-opportunities-cta-button"
                whileHover={{ scale: 1.1 }}
                onClick={handleSignUp}
              >
                {signedUp ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span>Signed Up!</span> ✔️
                  </motion.div>
                ) : (
                  'Sign Up'
                )}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VolunteerOpportunities;