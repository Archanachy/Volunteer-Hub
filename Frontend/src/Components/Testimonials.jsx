import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import '../Styles/Testimonials.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from './Navbar';

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const testimonials = [
    {
      name: 'John Doe',
      rating: 5,
      review: 'Volunteering with this organization has been a life-changing experience!',
    },
    {
      name: 'Jane Smith',
      rating: 4,
      review: 'Great opportunities to give back to the community.',
    },
    // Add more testimonials as needed
  ];

  return (
    <div>
      <Navbar></Navbar>
    <div className="testimonials-body">
      <div className="testimonials-container">
        <h1>Testimonials</h1>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <h2>{testimonial.name}</h2>
              <div className="star-rating">
                {[...Array(5)].map((star, i) => (
                  <motion.span
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: i < testimonial.rating ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                    className="star"
                  >
                    ★
                  </motion.span>
                ))}
              </div>
              <p>{testimonial.review}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </div>
  );
};

export default Testimonials;