import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Feedback = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [type, setType] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const feedbackData = { email, type, message };
      await axios.post('http://localhost:8080/api/feedback', feedbackData, {
        headers: {
          Authorization: `Bearer dummy-token`, // Replace with real token if used
        },
      });
      alert('✅ Feedback submitted successfully!');
      setMessage('');
      setType('suggestion');
    } catch (error) {
      console.error('Feedback submission error:', error);
      alert('❌ Failed to submit feedback.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Please login to submit feedback</h2>
        <button
          onClick={() => navigate('/login')}
          style={btnStyle}
        >
          Go to Login Page
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}
    >
      <h2>Feedback</h2>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={inputStyle}
      >
        <option value="suggestion">Suggestion</option>
        <option value="bug">Report a Bug</option>
        <option value="praise">Praise</option>
      </select>

      <textarea
        placeholder="Your message"
        required
        rows="5"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={inputStyle}
      />

      <button style={btnStyle}>Submit Feedback</button>
    </form>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontFamily: 'inherit',
};

const btnStyle = {
  padding: '10px 20px',
  background: '#4f46e5',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default Feedback;
