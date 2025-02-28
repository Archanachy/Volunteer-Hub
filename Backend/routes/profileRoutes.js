const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Get user profile
router.get('/:userId', getProfile);

// Update user profile
router.put('/:userId', upload.single('profilePic'), updateProfile);

module.exports = router;