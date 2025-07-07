import React, { useState, useEffect } from 'react';

const Watchlist = ({ isLoggedIn }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const savedWatchlist = localStorage.getItem('watchlist');
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    }
  }, [isLoggedIn]);

  const removeFromWatchlist = (dealId) => {
    const updatedWatchlist = watchlist.filter(item => item.dealId !== dealId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Watchlist</h2>
      
      {!isLoggedIn ? (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          border: '1px dashed #ccc',
          borderRadius: '8px'
        }}>
          <p style={{ marginBottom: '1rem' }}>🔒 Please login to view your watchlist</p>
          <button style={loginBtnStyle} onClick={() => window.location.href = '/login'}>
            Login Now
          </button>
        </div>
      ) : watchlist.length === 0 ? (
        <p>No items in your watchlist yet.</p>
      ) : (
        <div style={cardGridStyle}>
          {watchlist.map((deal, index) => (
            <div key={index} style={cardStyle}>
              <img src={deal.dealPhoto} alt={deal.dealTitle} style={imageStyle} />
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{deal.dealTitle}</h3>
              <p>
                <s>₹{deal.listPriceAmount}</s> <strong>₹{deal.dealPriceAmount}</strong>
              </p>
              <p style={{ color: 'green', marginBottom: '0.5rem' }}>{deal.savingsPercentage}% OFF</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a href={deal.dealUrl} target="_blank" rel="noreferrer">
                  <button style={buttonStyle}>Buy Now</button>
                </a>
                <button 
                  onClick={() => removeFromWatchlist(deal.dealId)}
                  style={removeBtnStyle}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Reuse styles from Home.js or define specific ones
const cardGridStyle = {
  display: 'flex',
  gap: '1.5rem',
  flexWrap: 'wrap',
  marginTop: '1rem'
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '1rem',
  borderRadius: '8px',
  width: '250px',
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s'
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '4px',
  marginBottom: '0.5rem'
};

const buttonStyle = {
  backgroundColor: '#4f46e5',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  flex: 1
};

const removeBtnStyle = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  flex: 1
};

const loginBtnStyle = {
  backgroundColor: '#4f46e5',
  color: 'white',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '1rem'
};

export default Watchlist;