const Notification = require('../models/Notification');
const User = require('../models/User');

// Create a new notification
exports.createNotification = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const newNotification = await Notification.create({ userId, message, readStatus: false });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all notifications for a user
exports.getNotificationsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    notification.readStatus = true;
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await notification.destroy();
    res.status(200).json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};