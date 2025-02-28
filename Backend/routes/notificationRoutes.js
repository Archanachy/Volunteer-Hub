const express = require('express');
const {
  createNotification,
  getNotificationsByUserId,
  markAsRead,
  deleteNotification,
} = require('../controllers/notificationController');
const router = express.Router();

// Create a new notification
router.post('/', createNotification);

// Get all notifications for a user
router.get('/user/:userId', getNotificationsByUserId);

// Mark a notification as read
router.put('/:id/read', markAsRead);

// Delete a notification
router.delete('/:id', deleteNotification);

module.exports = router;