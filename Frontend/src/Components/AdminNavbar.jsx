import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>VolunteerHub Admin</h1>
      </div>
      <ul className="navbar-links">
      <li>
          <a 
            onClick={() => handleNavigation('/admin')} 
            className={location.pathname === '/admin' ? 'navbar-active' : ''}
          >
            Home
          </a>
        </li>
        <li>
          <a 
            onClick={() => handleNavigation('/manage-volunteers')} 
            className={location.pathname === '/manage-volunteers' ? 'navbar-active' : ''}
          >
            Volunteers
          </a>
        </li>
        <li>
          <a 
            onClick={() => handleNavigation('/manage-events')} 
            className={location.pathname === '/manage-events' ? 'navbar-active' : ''}
          >
            Events
          </a>
        </li>
        <li>
          <a 
            onClick={() => handleNavigation('/approve-hours')} 
            className={location.pathname === '/approve-hours' ? 'navbar-active' : ''}
          >
            Hours
          </a>
        </li>
        <li>
          <a 
            onClick={() => handleNavigation('/manage-reviews')} 
            className={location.pathname === '/manage-reviews' ? 'navbar-active' : ''}
          >
            Reviews
          </a>
        </li>
        <li>
          <a 
            onClick={() => handleNavigation('/admin/messages')} 
            className={location.pathname === '/admin/messages' ? 'navbar-active' : ''}
          >
            Messages
          </a>
        </li>
        <li>
          <a 
            onClick={handleLogout}
            className="navbar-cta-button"
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar; 