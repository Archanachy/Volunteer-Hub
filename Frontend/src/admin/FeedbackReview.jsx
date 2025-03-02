import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Styles/FeedbackReview.css';
import Navbar from '../Components/Navbar';

const FeedbackReview = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Replace with actual user ID
    const eventId = 1; // Replace with actual event ID

    try {
      const response = await fetch('/api/feedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventId, feedbackText: feedback, rating }),
      });

      if (response.ok) {
        navigate('/reviews');
      } else {
        console.error('Error submitting feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleRating = (index) => {
    setRating(index);
  };

  return (
    <div className="feedbackreview-body">
      <Navbar></Navbar>
      <div className="feedbackreview-container">
        <h1>Submit Your Feedback</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => (
              <motion.span
                key={index}
                onClick={() => handleRating(index + 1)}
                initial={{ width: 0 }}
                animate={{ width: index < rating ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
                className="star"
              >
                ★
              </motion.span>
            ))}
          </div>
          <motion.button
            type="submit"
            className="feedback-cta-button"
            whileHover={{ scale: 1.1 }}
          >
            Submit
          </motion.button>
        </form>
        <div className="preview">
          <h2>Live Preview</h2>
          <p>{feedback}</p>
          <div className="star-rating">
            {[...Array(5)].map((star, index) => (
              <motion.span
                key={index}
                initial={{ width: 0 }}
                animate={{ width: index < rating ? '100%' : '0%' }}
                transition={{ duration: 0.5 }}
                className="star"
              >
                ★
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackReview;