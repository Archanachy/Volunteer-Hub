import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SignUpLoginPage.css';
import Navbar from './Navbar';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Add password reset logic here
    // If password reset is successful:
    setMessage('Password reset link has been sent to your email.');
    // If password reset fails:
    // setMessage('Password reset failed. Please try again.');
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="signup-login-body">
        <div className="signup-login-container">
          <h2>Password Reset</h2>
          <form onSubmit={handlePasswordReset}>
            <div className="login-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            {message && <p className="login-error-message">{message}</p>}
            <button type="submit" className="login-cta-button">Reset Password</button>
            <p className="login-toggle-text" onClick={() => navigate('/login')}>Back to Login</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;