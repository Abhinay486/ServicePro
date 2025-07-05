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
    const userType = form.userType.value;
    const phone = form.signupPhone ? form.signupPhone.value : '';
    const address = form.signupAddress ? form.signupAddress.value : '';

    if (userType !== 'customer') {
      toast.error('Only customer signup is supported here.');
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await axios.post(`${backendUrl}/api/customers/register`, {
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
      <div className="modal-content">
        <span className="modal-close" onClick={() => setShowSignup(false)}>&times;</span>
        <h3 style={{ marginBottom: '1.5rem' }}>Sign Up for ServicePro</h3>
        <form id="signupForm" ref={formRef} onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="signupName">Full Name</label>
            <input type="text" id="signupName" required />
          </div>
          <div className="form-group">
            <label htmlFor="signupEmail">Email</label>
            <input type="email" id="signupEmail" required />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <input type="password" id="signupPassword" required />
          </div>
          <div className="form-group">
            <label htmlFor="signupPhone">Phone</label>
            <input type="tel" id="signupPhone" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required />
          </div>
          <div className="form-group">
            <label htmlFor="signupAddress">Address</label>
            <input type="text" id="signupAddress" required />
          </div>
          <div className="form-group">
            <label htmlFor="userType">I am a:</label>
            <select id="userType" required>
              <option value="">Select user type</option>
              <option value="customer">Customer</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default SignupModal;
