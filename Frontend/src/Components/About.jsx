import React from 'react';
import Navbar from './Navbar';
import '../Styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-paragraph">
            Welcome to VolunteerOrg! Our mission is to connect volunteers with organizations that need them most. 
            We believe in the power of community and the impact that dedicated individuals can make.
          </p>
          <p className="about-paragraph">
            Our organization was founded with the goal of making it easier for people to find volunteer opportunities 
            that match their skills and interests. Whether you're looking to help out at a local food bank, participate 
            in community outreach, or support environmental initiatives, we have something for everyone.
          </p>
          <p className="about-paragraph">
            Join us today and be a part of a movement that is making a difference in the world. Together, we can create 
            positive change and build stronger communities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;