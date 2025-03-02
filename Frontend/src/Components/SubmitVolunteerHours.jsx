import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/SubmitVolunteerHours.css';

const SubmitVolunteerHours = () => {
  const { volunteerId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [hours, setHours] = useState('');
  const [eventId, setEventId] = useState('');
  const [status, setStatus] = useState('pending');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/volunteer-hours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: volunteerId, eventId, hours, status }),
      });

      if (response.ok) {
        navigate('/volunteer');
      } else {
        console.error('Error submitting volunteer hours');
      }
    } catch (error) {
      console.error('Error submitting volunteer hours:', error);
    }
  };

  return (
    <div><Navbar />
    <div className="submit-volunteer-hours-body">
      
      <div className="submit-volunteer-hours-container">
        <h1>Submit Volunteer Hours</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Event</label>
            <select value={eventId} onChange={(e) => setEventId(e.target.value)} required>
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Hours</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="cta-button">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SubmitVolunteerHours;