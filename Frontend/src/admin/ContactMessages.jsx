import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import '../Styles/ContactMessages.css';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read, replied
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, [filter]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      
      // Apply filter
      const filteredData = filter === 'all' 
        ? data 
        : data.filter(msg => msg.status === filter);
      
      setMessages(filteredData);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/contact/unread-count', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch unread count');
      const data = await response.json();
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/contact/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to mark as read');
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status: 'read', readAt: new Date() } : msg
      ));
      fetchUnreadCount();
      toast.success('Marked as read');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAsReplied = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/contact/${id}/replied`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to mark as replied');
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status: 'replied', repliedAt: new Date() } : msg
      ));
      toast.success('Marked as replied');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to mark as replied');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete message');
      
      // Update local state
      setMessages(messages.filter(msg => msg.id !== id));
      toast.success('Message deleted');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete message');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="contact-messages-container">
          <h1>Loading messages...</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="contact-messages-container">
        <ToastContainer />
        
        <div className="messages-header">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Messages
          </motion.h1>
          <span className="unread-badge">{unreadCount} Unread</span>
        </div>

        <div className="filter-controls">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-button ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
          <button
            className={`filter-button ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read
          </button>
          <button
            className={`filter-button ${filter === 'replied' ? 'active' : ''}`}
            onClick={() => setFilter('replied')}
          >
            Replied
          </button>
        </div>

        <div className="messages-grid">
          {messages.length === 0 ? (
            <p className="no-messages">No messages found.</p>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                className={`message-card ${message.status}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="message-header">
                  <h3>{message.subject}</h3>
                  <span className={`status-badge ${message.status}`}>
                    {message.status}
                  </span>
                </div>
                
                <div className="sender-info">
                  <p><strong>From:</strong> {message.name}</p>
                  <p><strong>Email:</strong> {message.email}</p>
                </div>
                
                <p className="message-text">{message.message}</p>
                
                <div className="message-footer">
                  <span className="timestamp">
                    Received: {formatDate(message.createdAt)}
                  </span>
                  
                  <div className="message-actions">
                    {message.status === 'unread' && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="action-button read"
                      >
                        Mark as Read
                      </button>
                    )}
                    {message.status === 'read' && (
                      <button
                        onClick={() => handleMarkAsReplied(message.id)}
                        className="action-button reply"
                      >
                        Mark as Replied
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="action-button delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages; 