import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import '../Styles/ApproveHours.css';

const ApproveHours = () => {
  const [volunteerHours, setVolunteerHours] = useState([]);

  useEffect(() => {
    const fetchVolunteerHours = async () => {
      try {
        const response = await fetch('/api/volunteer-hours');
        const data = await response.json();
        setVolunteerHours(data);
      } catch (error) {
        console.error('Error fetching volunteer hours:', error);
      }
    };
    fetchVolunteerHours();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/volunteer-hours/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (response.ok) {
        setVolunteerHours(volunteerHours.map((vh) => (vh.id === id ? { ...vh, status: 'approved' } : vh)));
      } else {
        console.error('Error approving volunteer hours');
      }
    } catch (error) {
      console.error('Error approving volunteer hours:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/volunteer-hours/${id}`, {
        method: 'DELETE',
      });
      setVolunteerHours(volunteerHours.filter((vh) => vh.id !== id));
    } catch (error) {
      console.error('Error deleting volunteer hours:', error);
    }
  };

  return (
    <div className="approve-hours-body">
      <Navbar />
      <div className="approve-hours-container">
        <h1>Approve Volunteer Hours</h1>
        <div className="volunteer-hours-list">
          {volunteerHours.map((vh) => (
            <motion.div
              key={vh.id}
              className="volunteer-hours-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <h2>{vh.User.name}</h2>
              <p>Event: {vh.Event.title}</p>
              <p>Hours: {vh.hours}</p>
              <p>Status: {vh.status}</p>
              {vh.status === 'pending' && (
                <motion.button
                  className="cta-button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleApprove(vh.id)}
                >
                  Approve
                </motion.button>
              )}
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDelete(vh.id)}
              >
                Delete
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproveHours;