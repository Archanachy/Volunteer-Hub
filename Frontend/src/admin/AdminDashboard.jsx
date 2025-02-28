import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../Styles/AdminDashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications/user/1'); // Replace with actual admin user ID
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleManageVolunteers = () => {
    navigate('/manage-volunteers');
  };

  const handleManageEvents = () => {
    navigate('/manage-events');
  };

  const handleApproveHours = () => {
    navigate('/approve-hours');
  };

  const handleManageFeedback = () => {
    navigate('/manage-feedback');
  };

  const handleManageTestimonials = () => {
    navigate('/manage-testimonials');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
      });

      if (response.ok) {
        setNotifications(notifications.map((notification) =>
          notification.id === id ? { ...notification, readStatus: true } : notification
        ));
      } else {
        console.error('Error marking notification as read');
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
      });
      setNotifications(notifications.filter((notification) => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
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
          <button onClick={toggleNotifications} className="admin-dashboard-notification-icon">
            🔔
          </button>
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
            onClick={handleManageFeedback}
          >
            Manage Feedback
          </motion.button>
          <motion.button
            className="admin-dashboard-cta-button"
            whileHover={{ scale: 1.1 }}
            onClick={handleManageTestimonials}
          >
            Manage Testimonials
          </motion.button>
        </div>
        <div className="admin-dashboard-charts">
          <Bar data={data} />
        </div>
        {showNotifications && (
          <motion.div
            className="admin-dashboard-notifications-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Notifications</h2>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className={notification.readStatus ? 'read' : 'unread'}>
                  <p>{notification.message}</p>
                  <div className="notification-actions">
                    {!notification.readStatus && (
                      <motion.button
                        className="cta-button"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as Read
                      </motion.button>
                    )}
                    <motion.button
                      className="cta-button"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      Delete
                    </motion.button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;