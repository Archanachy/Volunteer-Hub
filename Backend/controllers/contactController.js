const ContactMessage = require('../models/ContactMessage');

// Create a new contact message
exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all contact messages (admin only)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get unread messages count (admin only)
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await ContactMessage.count({
      where: { status: 'unread' }
    });
    res.status(200).json({ unreadCount: count });
  } catch (error) {
    console.error('Error counting unread messages:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    message.status = 'read';
    message.readAt = new Date();
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark message as replied
exports.markAsReplied = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    message.status = 'replied';
    message.repliedAt = new Date();
    await message.save();
    res.status(200).json(message);
  } catch (error) {
    console.error('Error marking message as replied:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findByPk(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.destroy();
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 