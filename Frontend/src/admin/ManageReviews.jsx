import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminNavbar from '../Components/AdminNavbar';
import '../Styles/ManageReviews.css';

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleApprove = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' }),
      });

      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === reviewId ? { ...review, status: 'approved' } : review
        ));
      }
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleReject = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' }),
      });

      if (response.ok) {
        setReviews(reviews.map(review =>
          review.id === reviewId ? { ...review, status: 'rejected' } : review
        ));
      }
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews(reviews.filter(review => review.id !== reviewId));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (loading) {
    return (
      <div className="manage-reviews-body">
        <AdminNavbar />
        <div className="manage-reviews-container">
          <h1>Manage Reviews</h1>
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar />
    <div className="manage-reviews-body">
      <div className="manage-reviews-container">
        <h1>Manage Reviews</h1>
        <div className="reviews-list">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              className="review-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="review-header">
                <h2>{review.User?.name || 'Anonymous'}</h2>
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
              <p className="event-title">Event: {review.Event?.title || 'Unknown Event'}</p>
              <p className="review-text">{review.reviewText}</p>
              <div className="review-status">Status: {review.status}</div>
              <div className="review-actions">
                {review.status === 'pending' && (
                  <>
                    <motion.button
                      className="approve-button"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleApprove(review.id)}
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      className="reject-button"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleReject(review.id)}
                    >
                      Reject
                    </motion.button>
                  </>
                )}
                <motion.button
                  className="delete-button"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
  
};


export default ManageReviews; 