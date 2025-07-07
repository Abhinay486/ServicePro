import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LoginModal = ({ showLogin, setShowLogin, setUser }) => {
  const formRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const email = form.loginEmail.value;
    const password = form.loginPassword.value;

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password
      });
      // Pass user, userType, and token to setUser (which is handleLoginSuccess in App)
      setUser({
        email: res.data.user.email,
        userId: res.data.user.id,
        name: res.data.user.name,
        userType: res.data.userType,
        token: res.data.token
      });
      toast.success(res.data.message || 'Login successful!');
      setShowLogin(false);
    } catch (err) {
      toast.error(
        (err.response && err.response.data && err.response.data.error) ||
        'Login failed. Please try again.'
      );
    }
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
              background: '#4D6DE3',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.875rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#393737'}
            onMouseOut={(e) => e.target.style.background = '#4D6DE3'}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
