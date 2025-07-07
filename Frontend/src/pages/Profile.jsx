import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    profilePicture: '',
    favoriteCategories: '',
    priceRange: '',
    emailNotifications: false,
    browserNotifications: false,
    smsAlerts: false,
    darkMode: false,
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      fetchProfile(storedEmail);
    }
  }, []);

  // Fetch profile data from backend
  const fetchProfile = async (userEmail) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/profile/${userEmail}`);
      if (response.data) {
        setProfile(response.data);
        setFormData(response.data);
      }
    } catch (err) {
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || 'Failed to load profile');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 2 * 1024 * 1024) { // Limit to 2MB
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select an image smaller than 2MB');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...formData,
        email: email // Ensure email is included
      };

      // Determine if we're updating or creating
      const url = profile 
        ? `http://localhost:8080/api/profile/update/${email}`
        : 'http://localhost:8080/api/profile/create';
      
      const method = profile ? 'put' : 'post';

      const response = await axios[method](url, payload, {
        validateStatus: (status) => status < 500 // Don't throw for 4xx errors
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccess(profile ? 'Profile updated!' : 'Profile created!');
        fetchProfile(email);
        setIsEditing(false);
      } else {
        setError(response.data?.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Request failed:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return <div className="message">Please log in to view your profile.</div>;
  }

  if (loading && !isEditing) {
    return <div className="message">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {/* Success/Error Messages */}
      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      {!profile || isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          {/* Profile Picture Upload */}
          <div className="profile-pic-upload">
            <label htmlFor="profile-pic">
              <img 
                src={formData.profilePicture || '/default-avatar.png'} 
                alt="Profile" 
                className="profile-pic"
              />
              <span className="upload-text">Click to change</span>
            </label>
            <input 
              type="file" 
              id="profile-pic" 
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </div>

          {/* Required Fields */}
          <div className="form-group">
            <label>First Name *</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Username *</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          {/* Optional Fields */}
          <div className="form-group">
            <label>Favorite Categories</label>
            <input
              name="favoriteCategories"
              value={formData.favoriteCategories}
              onChange={handleInputChange}
              placeholder="e.g., Electronics, Books"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Price Range</label>
            <input
              name="priceRange"
              value={formData.priceRange}
              onChange={handleInputChange}
              placeholder="e.g., 100-500"
              disabled={loading}
            />
          </div>

          {/* Notification Preferences */}
          <div className="preferences">
            <h3>Notification Preferences</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleInputChange}
                disabled={loading}
              />
              Email Notifications
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="browserNotifications"
                checked={formData.browserNotifications}
                onChange={handleInputChange}
                disabled={loading}
              />
              Browser Notifications
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="smsAlerts"
                checked={formData.smsAlerts}
                onChange={handleInputChange}
                disabled={loading}
              />
              SMS Alerts
            </label>
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleInputChange}
                disabled={loading}
              />
              Dark Mode
            </label>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={loading}
              className="primary-btn"
            >
              {loading ? 'Processing...' : (profile ? 'Update Profile' : 'Create Profile')}
            </button>
            
            {profile && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="secondary-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="profile-view">
          {/* Profile Picture */}
          <div className="profile-pic-container">
            <img 
              src={profile.profilePicture || '/default-avatar.png'} 
              alt="Profile" 
              className="profile-pic"
            />
          </div>

          {/* Profile Details */}
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{profile.firstName} {profile.lastName}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{profile.username}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{profile.email}</span>
            </div>
            
            {profile.favoriteCategories && (
              <div className="detail-item">
                <span className="detail-label">Favorite Categories:</span>
                <span className="detail-value">{profile.favoriteCategories}</span>
              </div>
            )}
            
            {profile.priceRange && (
              <div className="detail-item">
                <span className="detail-label">Price Range:</span>
                <span className="detail-value">{profile.priceRange}</span>
              </div>
            )}
            
            <div className="detail-item">
              <span className="detail-label">Email Notifications:</span>
              <span className="detail-value">
                {profile.emailNotifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Browser Notifications:</span>
              <span className="detail-value">
                {profile.browserNotifications ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">SMS Alerts:</span>
              <span className="detail-value">
                {profile.smsAlerts ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Dark Mode:</span>
              <span className="detail-value">
                {profile.darkMode ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          <button 
            onClick={() => setIsEditing(true)}
            className="edit-btn"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;