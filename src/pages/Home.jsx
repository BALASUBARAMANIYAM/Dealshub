import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Slider, Box, Typography } from '@mui/material';

const Home = ({ isLoggedIn }) => {
  const [deals, setDeals] = useState([]);
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchDeals();
    // Load watchlist from localStorage if user is logged in
    if (isLoggedIn) {
      const savedWatchlist = localStorage.getItem('watchlist');
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === '') {
        fetchDeals();
      } else {
        searchDeals(query);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchDeals = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/deals');
      setDeals(res.data);
      setNoResults(false);
    } catch (error) {
      console.error('Failed to load deals:', error);
    }
  };

 const refreshDeals = async () => {
  try {
    // Step 1: Delete expired or closed deals
    await axios.delete('http://localhost:8080/api/deals/expired');

    // Step 2: Fetch fresh deals from API and save to DB
    const res = await axios.get('http://localhost:8080/api/deals/fetch');

    // Step 3: Update frontend
    setDeals(res.data);
    setNoResults(false);
  } catch (error) {
    console.error('Failed to refresh deals:', error);
  }
};


  const searchDeals = async (term) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/deals/search?query=${term}`);
      setDeals(res.data);
      setNoResults(res.data.length === 0);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const addToWatchlist = (deal) => {
    if (!isLoggedIn) {
      alert("🔒 Please login to add this deal to your watchlist.");
      return;
    }
    
    if (!watchlist.some(item => item.dealId === deal.dealId)) {
      const updatedWatchlist = [...watchlist, deal];
      setWatchlist(updatedWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      alert("✅ Deal added to your watchlist!");
    } else {
      alert("⚠️ This deal is already in your watchlist!");
    }
  };

  const filteredDeals = deals.filter(
    (deal) =>
      deal.dealPriceAmount >= priceRange[0] && deal.dealPriceAmount <= priceRange[1]
  );

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Discover Amazing Deals</h2>
        <button onClick={refreshDeals} style={refreshBtnStyle}>
          🔄 Refresh Deals
        </button>
      </div>

      <p>Find the best offers on your favorite products</p>

      {/* Search & Filter */}
      <div style={topBarStyle}>
        <input
          type="text"
          placeholder="Search (e.g. redmi, headphones)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={searchInputStyle}
        />

        <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <Typography gutterBottom>
            💰 Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Typography>
          <Box>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={50000}
              step={500}
              sx={{
                color: '#4f46e5',
                '& .MuiSlider-thumb': { backgroundColor: '#4f46e5' },
                '& .MuiSlider-valueLabel': { backgroundColor: '#4f46e5' },
              }}
            />
          </Box>
        </div>
      </div>

      {/* Deals Section */}
      {noResults || filteredDeals.length === 0 ? (
        <p style={{ color: 'red', fontWeight: 'bold', marginTop: '1rem' }}>
          ❌ Currently no deals match your search or price range.
        </p>
      ) : (
        <div style={cardGridStyle}>
          {filteredDeals.map((deal, index) => (
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
                  onClick={() => addToWatchlist(deal)}
                  style={watchlistBtnStyle}
                  disabled={watchlist.some(item => item.dealId === deal.dealId)}
                >
                  {watchlist.some(item => item.dealId === deal.dealId) ? 'Added ✓' : 'Watchlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
const topBarStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginBottom: '2rem'
};

const searchInputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
  fontSize: '1rem'
};

const refreshBtnStyle = {
  backgroundColor: '#00b894',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '10px 15px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

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

const watchlistBtnStyle = {
  backgroundColor: '#f59e0b',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
  flex: 1,
  '&:disabled': {
    backgroundColor: '#d1d5db',
    cursor: 'not-allowed'
  }
};

export default Home;