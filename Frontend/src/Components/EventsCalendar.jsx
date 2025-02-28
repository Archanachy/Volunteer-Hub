import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-calendar/dist/Calendar.css';
import '../Styles/EventsCalendar.css';
import Navbar from './Navbar';

const EventsCalendar = () => {
  const [date, setDate] = useState(new Date());
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

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const filteredEvents = events.filter(
    (event) => new Date(event.date).toDateString() === date.toDateString()
  );

  return (
    <div className="events-calendar-body">
      <Navbar />
      <div className="events-calendar-container">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Events Calendar
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileClassName={({ date, view }) => {
              if (events.find((event) => new Date(event.date).toDateString() === date.toDateString())) {
                return 'events-calendar-highlight';
              }
            }}
            nextLabel={<span>&#10095;</span>}
            prevLabel={<span>&#10094;</span>}
            next2Label={null}
            prev2Label={null}
          />
        </motion.div>
        <AnimatePresence>
          {filteredEvents.length > 0 && (
            <motion.div
              className="events-calendar-events-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Events on {date.toDateString()}</h2>
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="events-calendar-event-card"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                  onClick={() => handleEventClick(event.id)}
                >
                  <h3>{event.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsCalendar;