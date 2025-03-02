import React, { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../Styles/SignUpLoginPage.css';
import Navbar from './Navbar';
import PasswordReset from './PasswordReset';

const SignUpLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userRole', data.user.role); // Store user role
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/volunteer');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    }
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setIsLogin(true); // Toggle to login form
        setError(''); // Clear any previous errors
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Sign-up failed. Please try again.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/password-reset');
  };

  return (
    <Routes>
      <Route path="/password-reset" element={<PasswordReset />} />
      <Route path="/" element={
        <div>
          <Navbar></Navbar>
          <div className="signup-login-body">
            <div className="signup-login-container">
              <AnimatePresence>
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className='login-signup'><h2>Login</h2></span>
                    <form onSubmit={handleLogin} className={error ? 'login-shake' : ''}>
                      <div className="login-input-group">
                        <input type="email" name="email" required />
                        <label>Email</label>
                      </div>
                      <div className="login-input-group">
                        <input type="password" name="password" required />
                        <label>Password</label>
                      </div>
                      {error && <p className="login-error-message">{error}</p>}
                      <button type="submit" className="login-cta-button">Login</button>
                      <p className="login-toggle-text" onClick={handleForgotPassword}>Forgot Password?</p>
                      <p className="login-toggle-text" onClick={handleToggle}>Don't have an account? Sign Up</p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignUp} className={error ? 'signup-shake' : ''}>
                      <div className="signup-input-group">
                        <input type="text" name="name" required />
                        <label>Full Name</label>
                      </div>
                      <div className="signup-input-group">
                        <input type="email" name="email" required />
                        <label>Email</label>
                      </div>
                      <div className="signup-input-group">
                        <input type="password" name="password" required />
                        <label>Password</label>
                      </div>
                      {error && <p className="signup-error-message">{error}</p>}
                      <button type="submit" className="signup-cta-button">Sign Up</button>
                      <p className="signup-toggle-text" onClick={handleToggle}>Already have an account? Login</p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default SignUpLogin;