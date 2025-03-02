import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import '../Styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

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
    <div className="home-page">
      <Navbar />
      <div className="home-page-content">
        <section id="hero" className="home-page-hero">
          <div className="home-page-hero-content">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Make a Difference in Your Community
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Join our community of volunteers and help create positive change
            </motion.p>
            <motion.button
              className="home-page-cta-button"
              whileHover={{ scale: 1.1 }}
              onClick={handleExploreOpportunities}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              Get Started
            </motion.button>
          </div>
        </section>

        <section id="about" className="home-page-about">
          <div className="home-page-about-content">
            <h2>About Us</h2>
            <p>
              We connect passionate volunteers with meaningful opportunities to serve their communities.
              Our platform makes it easy to find and participate in volunteer activities that match your interests.
            </p>
          </div>
        </section>

        <section id="testimonials" className="home-page-testimonials">
          <div className="home-page-testimonials-content">
            <h2>What Our Volunteers Say</h2>
            <div className="home-page-testimonial-cards">
              {/* Add testimonial cards here */}
            </div>
            <motion.button
              className="home-page-cta-button"
              whileHover={{ scale: 1.1 }}
              onClick={handleViewTestimonials}
            >
              View All Testimonials
            </motion.button>
          </div>
        </section>

        <section id="contact" className="home-page-contact">
          <div className="home-page-contact-content">
            <h2>Get in Touch</h2>
            <p>Have questions or want to learn more about volunteering opportunities?</p>
            <motion.button
              className="home-page-cta-button"
              whileHover={{ scale: 1.1 }}
              onClick={handleContactUs}
            >
              Contact Us
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;