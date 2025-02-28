import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import '../Styles/ManageFeedback.css';

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/api/feedbacks');
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await fetch(`/api/feedbacks/${feedbackId}`, {
        method: 'DELETE',
      });
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== feedbackId));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  return (
    <div className="manage-feedback-body">
      <Navbar />
      <div className="manage-feedback-container">
        <h1>Manage Feedback</h1>
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <motion.div
              key={feedback.id}
              className="feedback-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <h2>{feedback.User.name}</h2>
              <p>{feedback.feedbackText}</p>
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDeleteFeedback(feedback.id)}
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

export default ManageFeedback;