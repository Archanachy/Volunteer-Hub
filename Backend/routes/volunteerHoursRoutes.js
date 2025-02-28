const express = require('express');
const {
  createVolunteerHours,
  getAllVolunteerHours,
  getVolunteerHoursByUserId,
  updateVolunteerHoursStatus,
  deleteVolunteerHours,
} = require('../controllers/volunteerHoursController');
const router = express.Router();

// Create a new volunteer hours entry
router.post('/', createVolunteerHours);

// Get all volunteer hours
router.get('/', getAllVolunteerHours);

// Get volunteer hours by user ID
router.get('/user/:userId', getVolunteerHoursByUserId);

// Update volunteer hours status
router.put('/:id', updateVolunteerHoursStatus);

// Delete volunteer hours
router.delete('/:id', deleteVolunteerHours);

module.exports = router;