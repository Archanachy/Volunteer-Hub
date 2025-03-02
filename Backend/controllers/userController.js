const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword, role: 'volunteer' });

    // Create a profile for the new user
    await Profile.create({ userId: newUser.id });

    const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ where: { userId }, include: User });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { name, email, bio } = req.body;
  const profilePic = req.file ? req.file.path : null;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    const profile = await Profile.findOne({ where: { userId } });
    profile.bio = bio || profile.bio;
    if (profilePic) {
      profile.profilePic = profilePic;
    }
    await profile.save();

    res.status(200).json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Fetch all volunteers
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.findAll({ where: { role: 'volunteer' } });
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a volunteer by ID
exports.deleteVolunteer = async (req, res) => {
  const { id } = req.params;
  try {
    const volunteer = await User.findOne({ where: { id, role: 'volunteer' } });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    await volunteer.destroy();
    res.status(200).json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get volunteer profile by ID
exports.getVolunteerProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const volunteer = await User.findOne({ where: { id, role: 'volunteer' } });
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};