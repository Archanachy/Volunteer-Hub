import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/Profile.css';

const Profile = () => {
  const { volunteerId } = useParams();
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    const fetchVolunteerProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/volunteers/${volunteerId}`);
        const data = await response.json();
        setVolunteer(data);
      } catch (error) {
        console.error('Error fetching volunteer profile:', error);
      }
    };
    
    if (volunteerId) {
      fetchVolunteerProfile();
    }
  }, [volunteerId]);

  if (!volunteer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-body">
      <Navbar />
      <div className="profile-container">
        <h1>{volunteer.name}</h1>
        <p>Email: {volunteer.email}</p>
        <p>Hours: {volunteer.hours}</p>
        <p>Bio: {volunteer.bio}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default Profile;