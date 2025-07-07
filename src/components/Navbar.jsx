import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav style={navbarStyle}>
      <div style={navbarLeftStyle} onClick={() => window.location.href = '/'}>
        <h2 style={logoStyle}>DealsHub</h2>
      </div>

      <ul style={navLinksStyle}>
        <li style={navItemStyle}>
          <Link to="/" style={navLinkStyle}>Home</Link>
        </li>
        
        {isLoggedIn && (
          <li style={navItemStyle}>
            <Link to="/watchlist" style={navLinkStyle}>Watchlist</Link>
          </li>
        )}

        <li style={navItemStyle}>
          <Link to="/feedback" style={navLinkStyle}>Feedback</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li style={navItemStyle}>
              <Link to="/profile" style={navLinkStyle}>Profile</Link>
            </li>
            <li style={navItemStyle}>
              <button onClick={onLogout} style={logoutBtnStyle}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li style={navItemStyle}>
              <Link to="/login" style={navLinkStyle}>Login</Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/register" style={navLinkStyle}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Styles
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const navbarLeftStyle = {
  cursor: 'pointer'
};

const logoStyle = {
  margin: 0,
  color: '#4f46e5',
  fontSize: '1.5rem',
  fontWeight: 'bold'
};

const navLinksStyle = {
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  gap: '1.5rem'
};

const navItemStyle = {
  display: 'flex',
  alignItems: 'center'
};

const navLinkStyle = {
  textDecoration: 'none',
  color: '#4b5563',
  fontWeight: '500',
  fontSize: '1rem',
  transition: 'color 0.2s',
  ':hover': {
    color: '#4f46e5'
  }
};

const logoutBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#ef4444',
  fontWeight: '500',
  fontSize: '1rem',
  cursor: 'pointer',
  padding: 0,
  ':hover': {
    textDecoration: 'underline'
  }
};

export default Navbar;