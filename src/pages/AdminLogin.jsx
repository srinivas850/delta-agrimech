import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminLogin, isAdminAuthenticated } from '../utils/adminAuth';
import { BRAND } from '../data/siteData';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    // If already logged in, redirect directly to dashboard
    if (isAdminAuthenticated()) {
      navigate('/admin/enquiries', { replace: true });
    }

    // Check if redirected due to expired session
    const params = new URLSearchParams(location.search);
    if (params.get('expired')) {
      setInfo('Your previous session has expired. Please sign in again.');
    }
  }, [navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both your admin username and password.');
      return;
    }

    setLoading(true);
    setError('');
    setInfo('');

    try {
      await adminLogin(username.trim(), password.trim());
      navigate('/admin/enquiries', { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Brand header */}
        <div className="admin-login-header">
          <img
            src={BRAND.logoUrl}
            alt="Delta Agrimech"
            className="admin-login-logo"
            onError={(e) => {
              if (e.target.src !== window.location.origin + BRAND.localLogoUrl && !e.target.dataset.triedLocal) {
                e.target.dataset.triedLocal = 'true';
                e.target.src = BRAND.localLogoUrl;
              } else {
                e.target.style.display = 'none';
              }
            }}
          />
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-subtitle">
            Secure access to Delta Agrimech dealer & product enquiry management.
          </p>
        </div>

        {/* Alerts */}
        {info && <div className="admin-login-alert admin-login-alert--info">ℹ️ {info}</div>}
        {error && <div className="admin-login-alert admin-login-alert--error">⚠️ {error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
          <div className="admin-login-field">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Password</label>
            <div className="password-input-wrap">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary admin-login-btn"
            disabled={loading}
          >
            {loading ? 'Authenticating…' : 'Sign In to Dashboard →'}
          </button>
        </form>

        {/* Back to site link */}
        <div className="admin-login-footer">
          <a href="/" className="back-to-site-link">
            ← Return to Sreshta Impex LLP Website
          </a>
        </div>
      </div>
    </div>
  );
}
