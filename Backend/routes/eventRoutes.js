const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const router = express.Router();

// Create a new event
router.post('/', createEvent);

// Get all events
router.get('/', getAllEvents);

// Get a single event by ID
router.get('/:id', getEventById);

// Update an event
router.put('/:id', updateEvent);

// Delete an event
router.delete('/:id', deleteEvent);

module.exports = router; // Ensure this line is present