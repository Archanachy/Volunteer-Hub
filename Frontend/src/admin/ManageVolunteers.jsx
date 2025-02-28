import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import '../Styles/ManageVolunteers.css';

const ManageVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/volunteers');
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };
    fetchVolunteers();
  }, []);

  const handleViewProfile = (volunteerId) => {
    navigate(`/profile/${volunteerId}`);
  };

  const handleDeleteVolunteer = async (volunteerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this volunteer?');
    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(`http://localhost:3000/api/volunteers/${volunteerId}`, { method: 'DELETE' });
      setVolunteers(volunteers.filter(v => v.id !== volunteerId));
    } catch (error) {
      console.error('Error deleting volunteer:', error);
    }
  };

  return (
    <div className="manage-volunteers-body">
      <Navbar />
      <div className="manage-volunteers-container">
        <h1>Manage Volunteers</h1>
        <div className="volunteers-list">
          {volunteers.map((volunteer) => (
            <motion.div
              key={volunteer.id}
              className="volunteer-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <h2>{volunteer.name}</h2>
              <p>Email: {volunteer.email}</p>
              <p>Total Hours: {volunteer.hours}</p>
              <p>Approved Hours: {volunteer.approvedHours}</p>
              <p>Pending Approval: {volunteer.hours - volunteer.approvedHours}</p>
              <div className="volunteer-actions">
                <motion.button
                  className="cta-button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleViewProfile(volunteer.id)}
                >
                  View Profile
                </motion.button>
                <motion.button
                  className="cta-button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDeleteVolunteer(volunteer.id)}
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

export default ManageVolunteers;