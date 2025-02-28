const Feedback = require('../models/Feedback');
const User = require('../models/User');
const Event = require('../models/Event');

// Create a new feedback
exports.createFeedback = async (req, res) => {
  const { userId, eventId, feedbackText, rating } = req.body;
  try {
    const newFeedback = await Feedback.create({ userId, eventId, feedbackText, rating });
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [
        { model: User, attributes: ['name'] },
        { model: Event, attributes: ['title'] },
      ],
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a feedback
exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    await feedback.destroy();
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};