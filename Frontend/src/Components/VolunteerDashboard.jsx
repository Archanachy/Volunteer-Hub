import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/VolunteerDashboard.css';

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [volunteerHours, setVolunteerHours] = useState(0);
  const [totalHours, setTotalHours] = useState(100); // Example total hours
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications/user/1'); // Replace with actual user ID
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleNotificationClick = () => {
    navigate('/events/community-cleanup');
  };

  const percentage = (volunteerHours / totalHours) * 100;

  return (
    <div>
      <Navbar />
    <div className="volunteer-dashboard">
      <ToastContainer />
      
      <h1 className="volunteer-dashboard-title">Volunteer Dashboard</h1>
      <div className="volunteer-dashboard-cards">
        <motion.div
          className="volunteer-dashboard-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
        >
          <h2>Total Volunteer Hours</h2>
          <CircularProgressbar
            value={percentage}
            text={`${volunteerHours}/${totalHours}`}
            styles={buildStyles({
              textColor: '#f0f0f0',
              pathColor: '#00b0f0',
              trailColor: '#141414',
            })}
          />
        </motion.div>
        <motion.div
          className="volunteer-dashboard-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
        >
          <h2>Upcoming Events</h2>
          <ul>
            <li>Community Cleanup - March 5th</li>
            <li>Food Drive - March 12th</li>
          </ul>
        </motion.div>
      </div>
      <div className="volunteer-dashboard-actions">
        <motion.button
          className="volunteer-dashboard-cta-button"
          whileHover={{ scale: 1.1 }}
          onClick={handleProfileClick}
        >
          View Profile
        </motion.button>
        <motion.button
          className="volunteer-dashboard-cta-button"
          whileHover={{ scale: 1.1 }}
          onClick={handleNotificationClick}
        >
          View Notifications
        </motion.button>
      </div>
      <div className="volunteer-dashboard-notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className={notification.readStatus ? 'read' : 'unread'}>
              <p>{notification.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default VolunteerDashboard;