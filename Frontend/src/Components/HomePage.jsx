import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import '../Styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Smooth scroll for navigation links
    const links = document.querySelectorAll('.home-page-navbar-links a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }, []);

        useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await fetch('/api/notifications/user/1'); // Replace with actual user ID
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setNotifications(data);
          } else {
            const text = await response.text();
            console.error('Error fetching notifications: Response is not JSON', text);
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };
      fetchNotifications();
    }, []);

  const handleExploreOpportunities = () => {
    navigate('/volunteer-opportunities');
  };

  const handleViewTestimonials = () => {
    navigate('/testimonials');
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <div className="home-page-body">
      <Navbar />
      <div className="home-page-container">
        {/* Hero Section */}
        <section className="home-page-hero">
          <motion.div
            className="home-page-hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Join Us to Make a Difference
            </motion.h2>
            <motion.p
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Volunteer today and help create positive change in your community.
            </motion.p>
            <motion.button
              className="home-page-cta-button"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate('/login')}
            >
              Become a Volunteer
            </motion.button>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="home-page-about">
          <div className="home-page-about-content">
            <h2>About Us</h2>
            <p>Our mission is to connect volunteers with organizations that need them most. Together, we can make an impact.</p>
          </div>
        </section>

        {/* Upcoming Opportunities Section */}
        <section id="opportunities" className="home-page-opportunities">
          <div className="home-page-opportunities-content">
            <h2>Volunteer Opportunities</h2>
            <div className="home-page-opportunity-card">
              <h3>Community Outreach</h3>
              <p>Help us connect with local communities in need. Date: Feb 25, 2025</p>
              <motion.button
                className="home-page-cta-button"
                whileHover={{ scale: 1.1 }}
                onClick={handleExploreOpportunities}
              >
                Explore Opportunities
              </motion.button>
            </div>
            <div className="home-page-opportunity-card">
              <h3>Food Drive</h3>
              <p>Join our team to collect and distribute food to those in need. Date: March 1, 2025</p>
              <motion.button
                className="home-page-cta-button"
                whileHover={{ scale: 1.1 }}
                onClick={handleExploreOpportunities}
              >
                Explore Opportunities
              </motion.button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="home-page-testimonials">
          <div className="home-page-testimonials-content">
            <h2>What Our Volunteers Say</h2>
            <motion.button
              className="home-page-cta-button"
              whileHover={{ scale: 1.1 }}
              onClick={handleViewTestimonials}
            >
              View Testimonials
            </motion.button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="home-page-contact">
          <div className="home-page-contact-content">
            <h2>Contact Us</h2>
            <motion.button
              className="home-page-cta-button"
              whileHover={{ scale: 1.1 }}
              onClick={handleContactUs}
            >
              Contact Us
            </motion.button>
          </div>
        </section>

        {/* Notifications Section */}
      <section id="notifications" className="home-page-notifications">
        <div className="home-page-notifications-content">
          <h2>Notifications</h2>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className={notification.readStatus ? 'read' : 'unread'}>
                <p>{notification.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </div>
    </div>
  );
};

export default HomePage;