import React, { useState } from 'react';
import axios from 'axios';

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  margin: '0.5rem 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const btnStyle = {
  width: '100%',
  padding: '0.75rem',
  marginTop: '1rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

   try {
  const response = await axios.post('http://localhost:8080/api/auth/login', {
    email,
    password,
  });

  const message = response.data;

  if (message === 'Login successful!') {
    localStorage.setItem('userEmail', email);
    onLoginSuccess();
  } else {
    setError(message);
  }

} catch (err) {
  console.error('Login error:', err);
  if (err.response && err.response.data) {
    setError(err.response.data); // Backend message like "Invalid credentials"
  } else {
    setError('❌ Server error. Please try again later.');
  }
}


  };

  return (
    <form
      onSubmit={handleLogin}
      style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}
    >
      <h2>Login</h2>
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>
        Login
      </button>
    </form>
  );
};

export default Login;
