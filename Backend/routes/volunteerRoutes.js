const express = require('express');
const { getVolunteers, deleteVolunteer, getVolunteerProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/', getVolunteers);
router.get('/:id', getVolunteerProfile);
router.delete('/:id', deleteVolunteer);

module.exports = router;