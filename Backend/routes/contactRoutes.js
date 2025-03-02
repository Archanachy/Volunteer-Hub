const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getAllMessages,
  getUnreadCount,
  markAsRead,
  markAsReplied,
  deleteMessage
} = require('../controllers/contactController');

// Public route - anyone can submit a contact message
router.post('/', createContactMessage);

// Admin only routes
router.get('/', getAllMessages);
router.get('/unread-count', getUnreadCount);
router.put('/:id/read', markAsRead);
router.put('/:id/replied', markAsReplied);
router.delete('/:id', deleteMessage);

module.exports = router; 