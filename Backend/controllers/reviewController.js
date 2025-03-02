const Review = require('../models/Review');
const User = require('../models/User');
const Event = require('../models/Event');

// Create a new review
exports.createReview = async (req, res) => {
  const { userId, eventId, rating, reviewText } = req.body;
  try {
    const newReview = await Review.create({
      userId,
      eventId,
      rating,
      reviewText,
      status: 'pending'
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: 'ReviewUser',
          attributes: ['name']
        },
        {
          model: Event,
          as: 'ReviewEvent',
          attributes: ['title']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get reviews by user ID
exports.getReviewsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { userId },
      include: [
        {
          model: Event,
          as: 'ReviewEvent',
          attributes: ['title']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get reviews by event ID
exports.getReviewsByEventId = async (req, res) => {
  const { eventId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { eventId },
      include: [
        {
          model: User,
          as: 'ReviewUser',
          attributes: ['name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching event reviews:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update review status
exports.updateReviewStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    review.status = status;
    await review.save();
    res.status(200).json(review);
  } catch (error) {
    console.error('Error updating review status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    await review.destroy();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 