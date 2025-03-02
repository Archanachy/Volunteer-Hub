import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import '../Styles/ReviewForm.css';

const ReviewForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (response.ok) {
          const data = await response.json();
          setEventDetails(data);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = 1; // Replace with actual user ID from auth context

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          eventId,
          reviewText: review,
          rating,
        }),
      });

      if (response.ok) {
        navigate('/testimonials');
      } else {
        console.error('Error submitting review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div>
      <Navbar />
      <div className="review-form-body">
        <div className="review-form-container">
          <h1>Write a Review</h1>
          {eventDetails && (
            <div className="event-details">
              <h2>{eventDetails.title}</h2>
              <p>{eventDetails.description}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Your Review</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience..."
                required
              />
            </div>
            <div className="rating-group">
              <label>Rating</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <motion.span
                    key={value}
                    onClick={() => handleRating(value)}
                    whileHover={{ scale: 1.2 }}
                    className={`star ${value <= rating ? 'active' : ''}`}
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            </div>
            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.05 }}
              disabled={!rating || !review.trim()}
            >
              Submit Review
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm; 