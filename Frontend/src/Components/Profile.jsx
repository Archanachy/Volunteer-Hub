import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/Profile.css';

const Profile = () => {
  const { volunteerId } = useParams();
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    // Fetch volunteer data from the backend using volunteerId
    // Example data
    const fetchedVolunteer = {
      id: volunteerId,
      name: 'John Doe',
      email: 'john.doe@example.com',
      hours: 120,
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      // Add more fields as needed
    };
    setVolunteer(fetchedVolunteer);
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