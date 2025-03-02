const VolunteerHours = require('../models/VolunteerHours');
const User = require('../models/User');
const Event = require('../models/Event');

// Create a new volunteer hours entry
exports.createVolunteerHours = async (req, res) => {
  const { userId, eventId, hours, status } = req.body;
  try {
    const newVolunteerHours = await VolunteerHours.create({ userId, eventId, hours, status });
    res.status(201).json(newVolunteerHours);
  } catch (error) {
    console.error('Error creating volunteer hours:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all volunteer hours
exports.getAllVolunteerHours = async (req, res) => {
  try {
    const volunteerHours = await VolunteerHours.findAll({
      include: [
        { 
          model: User,
          as: 'User',
          attributes: ['name']
        },
        { 
          model: Event,
          as: 'Event',
          attributes: ['title']
        }
      ]
    });
    res.status(200).json(volunteerHours);
  } catch (error) {
    console.error('Error fetching volunteer hours:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get volunteer hours by user ID
exports.getVolunteerHoursByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const volunteerHours = await VolunteerHours.findAll({
      where: { userId },
      include: [
        { 
          model: Event,
          as: 'Event',
          attributes: ['title']
        }
      ]
    });
    res.status(200).json(volunteerHours);
  } catch (error) {
    console.error('Error fetching volunteer hours by user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update volunteer hours status
exports.updateVolunteerHoursStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const volunteerHours = await VolunteerHours.findByPk(id);
    if (!volunteerHours) {
      return res.status(404).json({ message: 'Volunteer hours not found' });
    }
    volunteerHours.status = status;
    await volunteerHours.save();
    res.status(200).json(volunteerHours);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete volunteer hours
exports.deleteVolunteerHours = async (req, res) => {
  const { id } = req.params;
  try {
    const volunteerHours = await VolunteerHours.findByPk(id);
    if (!volunteerHours) {
      return res.status(404).json({ message: 'Volunteer hours not found' });
    }
    await volunteerHours.destroy();
    res.status(200).json({ message: 'Volunteer hours deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};