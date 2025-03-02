import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import '../Styles/Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          // Filter only approved reviews
          const approvedReviews = data.filter(review => review.status === 'approved');
          setReviews(approvedReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="reviews-page">
        <Navbar />
        <div className="reviews-container">
          <h1>Volunteer Reviews</h1>
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <Navbar />
      <div className="reviews-container">
        <h1>Volunteer Reviews</h1>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="review-header">
                <h2>{review.ReviewUser?.name || 'Anonymous Volunteer'}</h2>
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`star ${index < review.rating ? 'active' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="event-title">Event: {review.ReviewEvent?.title || 'Unknown Event'}</p>
              <p className="review-text">{review.reviewText}</p>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews; 