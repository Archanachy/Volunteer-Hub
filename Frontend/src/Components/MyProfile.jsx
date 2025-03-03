import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Styles/MyProfile.css';
import Navbar from './Navbar';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const navigate = useNavigate();
  const { volunteerId } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!volunteerId) {
        navigate('/login');
        return;
      }
      
      try {
        const response = await fetch(`/api/profiles/${volunteerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
        setProfilePicPreview(data.profilePic ? `/${data.profilePic}` : null);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };
    fetchProfile();
  }, [volunteerId, navigate]);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  const handleSubmitHours = () => {
    navigate(`/submit-hours/${volunteerId}`);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('bio', profile.bio);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    try {
      const response = await fetch(`/api/profiles/${volunteerId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await response.json();
      setProfile(data.profile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    // Clear authentication tokens or any other logout logic
    localStorage.removeItem('token'); // Example: remove auth token from local storage
    localStorage.removeItem('userId'); // Example: remove user ID from local storage
    localStorage.removeItem('userRole'); // Example: remove token expiration from local storage
    
    navigate('/login');
  };

  return (
    <div className="my-profile-body">
      <Navbar />
      <div className="my-profile-container">
        <motion.div
          className="my-profile-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="my-profile-header">
            <h1>My Profile</h1>
            <button onClick={handleEditProfile} className="my-profile-cta-button">
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          <div className="my-profile-content">
            <div className="my-profile-avatar-section">
              <img
                src={profilePicPreview || '/path/to/default-avatar.png'}
                alt="Profile Avatar"
                className="my-profile-avatar"
              />
              {isEditing && (
                <div className="my-profile-avatar-upload-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="my-profile-avatar-upload"
                    id="profilePicInput"
                  />
                  <label htmlFor="profilePicInput" className="my-profile-avatar-upload-button">
                    Choose File
                  </label>
                </div>
              )}
            </div>
            <div className="my-profile-info-section">
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              {isEditing && (
                <motion.div
                  className="my-profile-edit-fields"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="my-profile-input-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="my-profile-input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                  <div className="my-profile-input-group">
                    <label>Bio</label>
                    <input
                      type="text"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    />
                  </div>
                  <button onClick={handleSaveChanges} className="my-profile-cta-button">Save Changes</button>
                </motion.div>
              )}
            </div>
          </div>
          <button onClick={handleSubmitHours} className="my-profile-cta-button">
            Submit Hours
          </button>
          <button onClick={handleLogout} className="my-profile-cta-button">
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;