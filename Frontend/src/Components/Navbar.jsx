import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>VolunteerOrg</h1>
      </div>
      <ul className="navbar-links">
        <li><a onClick={() => handleNavigation('/')} className={location.pathname === '/' ? 'navbar-active' : ''}>Home</a></li>
        <li><a onClick={() => handleNavigation('/about')} className={location.pathname === '/about' ? 'navbar-active' : ''}>About</a></li>
        <li><a onClick={() => handleNavigation('/volunteer-opportunities')} className={location.pathname === '/volunteer-opportunities' ? 'navbar-active' : ''}>Opportunities</a></li>
        <li><a onClick={() => handleNavigation('/events')} className={location.pathname === '/events' ? 'navbar-active' : ''}>Events</a></li>
        <li><a onClick={() => handleNavigation('/contact')} className={location.pathname === '/contact' ? 'navbar-active' : ''}>Contact</a></li>
        <li><a onClick={() => handleNavigation('/login')} className={`navbar-cta-button ${location.pathname === '/login' ? 'navbar-active' : ''}`}>Log In / Sign Up</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;