import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SignupModal = ({ showSignup, setShowSignup }) => {
  const formRef = useRef();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.signupName.value;
    const email = form.signupEmail.value;
    const password = form.signupPassword.value;
    const phone = form.signupPhone ? form.signupPhone.value : '';
    const address = form.signupAddress ? form.signupAddress.value : '';

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
        phone,
        address
      });
      toast.success(res.data.message || 'Account created successfully! Welcome to ServicePro');
      setShowSignup(false);
    } catch (err) {
      toast.error(
        (err.response && err.response.data && err.response.data.error) ||
        'Signup failed. Please try again.'
      );
    }
  };

  return showSignup ? (
    <div id="signupModal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(77, 109, 227, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(77, 109, 227, 0.15)',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <span className="modal-close" onClick={() => setShowSignup(false)} style={{ color: '#393737' }}>&times;</span>
        <h3 style={{ 
          marginBottom: '1.5rem', 
          color: '#393737',
          fontSize: '1.5rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>Sign Up for ServicePro</h3>
        <form id="signupForm" ref={formRef} onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="signupName" style={{ color: '#393737', fontWeight: '500' }}>Full Name</label>
            <input 
              type="text" 
              id="signupName" 
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
            <label htmlFor="signupEmail" style={{ color: '#393737', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              id="signupEmail" 
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
            <label htmlFor="signupPassword" style={{ color: '#393737', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              id="signupPassword" 
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
            <label htmlFor="signupPhone" style={{ color: '#393737', fontWeight: '500' }}>Phone</label>
            <input 
              type="tel" 
              id="signupPhone" 
              pattern="[0-9]{10}" 
              title="Please enter a valid 10-digit phone number" 
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
            <label htmlFor="signupAddress" style={{ color: '#393737', fontWeight: '500' }}>Address</label>
            <input 
              type="text" 
              id="signupAddress" 
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default SignupModal;
