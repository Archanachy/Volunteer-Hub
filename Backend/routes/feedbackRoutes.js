const express = require('express');
const { createFeedback, getAllFeedbacks, deleteFeedback } = require('../controllers/feedbackController');
const router = express.Router();

// Create a new feedback
router.post('/', createFeedback);

// Get all feedbacks
router.get('/', getAllFeedbacks);

// Delete a feedback
router.delete('/:id', deleteFeedback);

module.exports = router;