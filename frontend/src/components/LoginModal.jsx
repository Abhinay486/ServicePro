import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { cipher } from '../utils/cipher';

const LoginModal = ({ showLogin, setShowLogin, setUser, setUserType }) => {
  const formRef = useRef();
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'

  // Hardcoded admin credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@servicepro.com',
    password: 'admin123'
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const email = form.loginEmail.value;
    const password = form.loginPassword.value;

    // Check if it's admin login
    if (loginType === 'admin') {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        setUser({ email, userId: 'admin', name: 'Administrator' });
        setUserType('admin');
        toast.success('Admin login successful! Welcome to Admin Dashboard.');
        setShowLogin(false);
        return;
      } else {
        toast.error('Invalid admin credentials. Please check your email and password.');
        return;
      }
    }

    // Regular user login
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password
      });
      setUser({ email, userId: res.data.userId });
      setUserType(res.data.userType);
      // Store credentials in localStorage with ciphered password
      localStorage.setItem('servicepro_login_email', email);
      localStorage.setItem('servicepro_login_password', cipher(password));
      toast.success(res.data.message || 'Login successful! Welcome back to ServicePro.');
      setShowLogin(false);
    } catch (err) {
      toast.error(
        (err.response && err.response.data && err.response.data.error) ||
        'Login failed. Please try again.'
      );
    }
  };

  const handleAdminQuickLogin = () => {
    const form = formRef.current;
    form.loginEmail.value = ADMIN_CREDENTIALS.email;
    form.loginPassword.value = ADMIN_CREDENTIALS.password;
    setLoginType('admin');
  };

  return showLogin ? (
    <div id="loginModal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(77, 109, 227, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(77, 109, 227, 0.15)'
      }}>
        <span className="modal-close" onClick={() => setShowLogin(false)} style={{ color: '#393737' }}>&times;</span>
        <h3 style={{ 
          marginBottom: '1.5rem', 
          color: '#393737',
          fontSize: '1.5rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>Login to ServicePro</h3>
        
        {/* Login Type Selector */}
        <div style={{ 
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '0.5rem',
          padding: '0.25rem',
          background: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <button
            type="button"
            onClick={() => setLoginType('user')}
            style={{
              flex: 1,
              padding: '0.5rem',
              border: 'none',
              borderRadius: '6px',
              background: loginType === 'user' ? '#4D6DE3' : 'transparent',
              color: loginType === 'user' ? '#ffffff' : '#666',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => setLoginType('admin')}
            style={{
              flex: 1,
              padding: '0.5rem',
              border: 'none',
              borderRadius: '6px',
              background: loginType === 'admin' ? '#ff6b35' : 'transparent',
              color: loginType === 'admin' ? '#ffffff' : '#666',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Admin Login
          </button>
        </div>

        {loginType === 'admin' && (
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <p style={{ 
              margin: '0 0 0.5rem 0', 
              fontSize: '0.9rem', 
              color: '#856404',
              fontWeight: '500'
            }}>
              Admin Credentials:
            </p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#856404' }}>
              Email: admin@servicepro.com
            </p>
            <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: '#856404' }}>
              Password: admin123
            </p>
            <button
              type="button"
              onClick={handleAdminQuickLogin}
              style={{
                background: '#ff6b35',
                color: '#ffffff',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              Quick Fill
            </button>
          </div>
        )}
        
        <form id="loginForm" ref={formRef} onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="loginEmail" style={{ color: '#393737', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              id="loginEmail" 
              required 
              style={{
                border: '2px solid #C7EEFF',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '1rem',
                background: '#FFFFFF',
                color: '#393737',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4D6DE3'}
              onBlur={(e) => e.target.style.borderColor = '#C7EEFF'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword" style={{ color: '#393737', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              id="loginPassword" 
              required 
              style={{
                border: '2px solid #C7EEFF',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '1rem',
                background: '#FFFFFF',
                color: '#393737',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4D6DE3'}
              onBlur={(e) => e.target.style.borderColor = '#C7EEFF'}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%',
              background: loginType === 'admin' ? '#ff6b35' : '#4D6DE3',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.875rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = loginType === 'admin' ? '#e55a2b' : '#393737'}
            onMouseOut={(e) => e.target.style.background = loginType === 'admin' ? '#ff6b35' : '#4D6DE3'}
          >
            {loginType === 'admin' ? 'Login as Admin' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
