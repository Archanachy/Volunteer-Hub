import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rating } from 'react-simple-star-rating';
import Navbar from './Navbar';
import '../Styles/Reviews.css';

const Reviews = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, approved, pending
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, rating
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchReviews();
  }, [userId, filter, sortBy, navigate]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews?filter=${filter}&sort=${sortBy}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('Error fetching reviews: ' + err.message);
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="reviews-container">
          <h1>Loading reviews...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="reviews-container">
          <h1>Error</h1>
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="reviews-container">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="reviews-title"
        >
          Event Reviews
        </motion.h1>

        <motion.div
          className="reviews-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="filter-controls">
            <button
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => handleFilterChange('all')}
            >
              All Reviews
            </button>
            <button
              className={`filter-button ${filter === 'approved' ? 'active' : ''}`}
              onClick={() => handleFilterChange('approved')}
            >
              Approved
            </button>
            <button
              className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => handleFilterChange('pending')}
            >
              Pending
            </button>
          </div>

          <div className="sort-controls">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          className="reviews-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews found.</p>
          ) : (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                className="review-card"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="review-header">
                  <h3>{review.ReviewEvent?.title}</h3>
                  <Rating
                    readonly
                    initialValue={review.rating}
                    size={20}
                    allowFraction
                  />
                </div>
                <p className="review-text">{review.reviewText}</p>
                <div className="review-footer">
                  <span className="review-author">By: {review.ReviewUser?.name}</span>
                  <span className="review-date">{formatDate(review.createdAt)}</span>
                  <span className={`review-status ${review.status.toLowerCase()}`}>
                    {review.status}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews; 