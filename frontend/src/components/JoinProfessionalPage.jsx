import React from 'react';

const JoinProfessionalPage = ({ professionalFormRef, handleProfessionalSubmit, professionalSuccess, showPage, page }) => (
  <div id="join" className={`page${page === 'join' ? ' active' : ''}`}>
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Join as a Professional</h2>
      <form id="professionalForm" ref={professionalFormRef} onSubmit={handleProfessionalSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" required />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service Category</label>
          <select id="service" name="service" required>
            <option value="">Select your service</option>
            <option value="ac-repair">AC Repair & Service</option>
            <option value="plumbing">Plumbing Services</option>
            <option value="electrical">Electrical Work</option>
            <option value="appliance-repair">Appliance Repair</option>
            <option value="cleaning">Cleaning Services</option>
            <option value="pest-control">Pest Control</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="experience">Years of Experience</label>
          <select id="experience" name="experience" required>
            <option value="">Select experience</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Service Location</label>
          <select id="location" name="location" required>
            <option value="">Select your city</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="bangalore">Bangalore</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="chennai">Chennai</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hourlyRate">Hourly Rate (₹)</label>
          <input type="number" id="hourlyRate" name="hourlyRate" min="100" max="5000" required />
        </div>
        <div className="form-group">
          <label htmlFor="description">About Your Services</label>
          <textarea id="description" name="description" rows="4" placeholder="Describe your expertise and services..." required></textarea>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>Submit Application</button>
      </form>
      {professionalSuccess && (
        <div className="success-message">
          <h3>Application Submitted Successfully!</h3>
          <p>Thank you {professionalSuccess.name}! We'll review your application and contact you within 24 hours.</p>
          <p>Service: {professionalSuccess.service.replace('-', ' ')}</p>
          <p>Location: {professionalSuccess.location}</p>
        </div>
      )}
    </div>
  </div>
);

export default JoinProfessionalPage;
