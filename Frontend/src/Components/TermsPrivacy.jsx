import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../Styles/TermsPrivacy.css';
import Navbar from './Navbar';

const TermsPrivacy = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div><Navbar></Navbar>
    <div className="terms-privacy-body">
      <h1>Terms & Conditions / Privacy Policy</h1>
      <div className="terms-privacy-navigation">
        <button onClick={() => scrollToSection('terms')}>Terms & Conditions</button>
        <button onClick={() => scrollToSection('privacy')}>Privacy Policy</button>
      </div>
      <div className="terms-privacy-content">
        <div id="terms" className="terms-privacy-section">
          <h2 onClick={() => toggleSection('terms')}>Terms & Conditions</h2>
          {expandedSection === 'terms' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>Here are the terms and conditions...</p>
              {/* Add more content as needed */}
            </motion.div>
          )}
        </div>
        <div id="privacy" className="terms-privacy-section">
          <h2 onClick={() => toggleSection('privacy')}>Privacy Policy</h2>
          {expandedSection === 'privacy' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>Here is the privacy policy...</p>
              {/* Add more content as needed */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default TermsPrivacy;