import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminNavbar from '../Components/AdminNavbar';
import '../Styles/ApproveHours.css';

const ApproveHours = () => {
  const [volunteerHours, setVolunteerHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVolunteerHours = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/volunteer-hours');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVolunteerHours(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching volunteer hours:', error);
        setError('Failed to load volunteer hours. Please try again later.');
        setVolunteerHours([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVolunteerHours();
  }, []);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/volunteer-hours/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedHours = await response.json();
      setVolunteerHours(volunteerHours.map((vh) => 
        vh.id === id ? { ...vh, status: 'approved' } : vh
      ));
    } catch (error) {
      console.error('Error approving volunteer hours:', error);
      alert('Failed to approve volunteer hours. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/volunteer-hours/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setVolunteerHours(volunteerHours.filter((vh) => vh.id !== id));
    } catch (error) {
      console.error('Error deleting volunteer hours:', error);
      alert('Failed to delete volunteer hours. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="approve-hours-body">
        <AdminNavbar />
        <div className="approve-hours-container">
          <h1>Approve Volunteer Hours</h1>
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="approve-hours-body">
        <AdminNavbar />
        <div className="approve-hours-container">
          <h1>Approve Volunteer Hours</h1>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="approve-hours-body">
      <AdminNavbar />
      <div className="approve-hours-container">
        <h1>Approve Volunteer Hours</h1>
        {volunteerHours.length === 0 ? (
          <div className="no-hours-message">No volunteer hours to approve.</div>
        ) : (
          <div className="volunteer-hours-list">
            {volunteerHours.map((vh) => (
              <motion.div
                key={vh.id}
                className="volunteer-hours-card"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
              >
                <h2>{vh.User?.name || 'Unknown User'}</h2>
                <p>Event: {vh.Event?.title || 'Unknown Event'}</p>
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
                  className="cta-button delete-button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDelete(vh.id)}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveHours;