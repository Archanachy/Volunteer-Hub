const express = require('express');
const { getVolunteers, deleteVolunteer } = require('../controllers/userController');

const router = express.Router();

router.get('/', getVolunteers);
router.delete('/:id', deleteVolunteer);

module.exports = router;