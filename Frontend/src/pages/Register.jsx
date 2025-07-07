import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('❌ Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', {
        name: fullName,
        email,
        password
      });

      if (res.status === 200 || res.status === 201) {
        alert('✅ Registration successful');
        // Optionally redirect or reset form
      }
    } catch (err) {
      console.error('Registration error:', err);

      if (err.response && err.response.status === 409) {
        alert('⚠️ User already exists! Please log in.');
      } else {
        alert('❌ Registration failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        style={inputStyle}
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnStyle}>Create Account</button>
    </form>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const btnStyle = {
  padding: '10px 20px',
  background: '#4f46e5',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Register;
