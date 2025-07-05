import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { cipher } from '../utils/cipher';

const LoginModal = ({ showLogin, setShowLogin, setUser, setUserType }) => {
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

  return showLogin ? (
    <div id="loginModal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="modal-close" onClick={() => setShowLogin(false)}>&times;</span>
        <h3 style={{ marginBottom: '1.5rem' }}>Login to ServicePro</h3>
        <form id="loginForm" ref={formRef} onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input type="email" id="loginEmail" required />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input type="password" id="loginPassword" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default LoginModal;
