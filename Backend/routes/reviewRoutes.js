const express = require('express');
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewsByUserId,
  getReviewsByEventId,
  updateReviewStatus,
  deleteReview,
} = require('../controllers/reviewController');

// Create a new review
router.post('/', createReview);

// Get all reviews
router.get('/', getAllReviews);

// Get reviews by user ID
router.get('/user/:userId', getReviewsByUserId);

// Get reviews by event ID
router.get('/event/:eventId', getReviewsByEventId);

// Update review status (approve/reject)
router.put('/:id', updateReviewStatus);

// Delete review
router.delete('/:id', deleteReview);

module.exports = router; 