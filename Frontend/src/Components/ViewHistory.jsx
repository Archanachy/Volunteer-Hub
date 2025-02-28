import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/ViewHistory.css';
import Navbar from './Navbar';

const ViewHistory = () => {
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate('/my-profile');
  };

  return (
    <div className="view-history-body">
      <Navbar />
      <div className="view-history-container">
        <h1>Volunteer History</h1>
        <div className="history-list">
          {/* Example history items */}
          <div className="history-item">
            <p><strong>Date:</strong> January 15, 2025</p>
            <p><strong>Hours:</strong> 5</p>
            <p><strong>Description:</strong> Volunteered at local food bank.</p>
          </div>
          <div className="history-item">
            <p><strong>Date:</strong> February 10, 2025</p>
            <p><strong>Hours:</strong> 3</p>
            <p><strong>Description:</strong> Assisted in community clean-up.</p>
          </div>
          {/* Add more history items as needed */}
        </div>
        <button onClick={handleBackToProfile} className="view-history-cta-button">
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default ViewHistory;