import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../Styles/AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleManageVolunteers = () => {
    navigate('/manage-volunteers');
  };

  const handleManageEvents = () => {
    navigate('/manage-events');
  };

  const handleApproveHours = () => {
    navigate('/approve-hours');
  };

  const handleManageReviews = () => {
    navigate('/manage-reviews');
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Volunteer Hours',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dashboard-body">
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-dashboard-actions">
          <motion.button
            className="admin-dashboard-cta-button"
            whileHover={{ scale: 1.1 }}
            onClick={handleManageVolunteers}
          >
            Manage Volunteers
          </motion.button>
          <motion.button
            className="admin-dashboard-cta-button"
            whileHover={{ scale: 1.1 }}
            onClick={handleManageEvents}
          >
            Manage Events
          </motion.button>
          <motion.button
            className="admin-dashboard-cta-button"
            whileHover={{ scale: 1.1 }}
            onClick={handleApproveHours}
          >
            Approve Hours
          </motion.button>
          <motion.button
            className="admin-dashboard-cta-button"
            whileHover={{ scale: 1.1 }}
            onClick={handleManageReviews}
          >
            Manage Reviews
          </motion.button>
        </div>
        <div className="admin-dashboard-charts">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;