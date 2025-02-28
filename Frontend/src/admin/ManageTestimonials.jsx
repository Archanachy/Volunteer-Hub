import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import '../Styles/ManageTestimonials.css';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Mock API response
    const fetchTestimonials = async () => {
      try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = [
          { id: 1, user: 'John Doe', testimonial: 'Volunteering with this organization has been a life-changing experience!' },
          { id: 2, user: 'Jane Smith', testimonial: 'Great opportunities to give back to the community.' },
          // Add more mock testimonials as needed
        ];
        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== testimonialId));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  return (
    <div className="manage-testimonials-body">
      <Navbar />
      <div className="manage-testimonials-container">
        <h1>Manage Testimonials</h1>
        <div className="testimonials-list">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <h2>{testimonial.user}</h2>
              <p>{testimonial.testimonial}</p>
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.1 }}
                onClick={() => handleDeleteTestimonial(testimonial.id)}
              >
                Delete
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;