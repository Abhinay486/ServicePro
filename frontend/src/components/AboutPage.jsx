import React from 'react';

const AboutPage = ({ page }) => (
  <div id="about" className={`page${page === 'about' ? ' active' : ''}`}>
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>About ServicePro</h2>
      <div style={{ textAlign: 'center', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.5rem' }}>ServicePro is your trusted platform for connecting with experienced professionals and technicians in your area. We make it easy to find, book, and pay for quality services.</p>
        <h3 style={{ color: '#667eea', margin: '2rem 0 1rem' }}>For Customers</h3>
        <p style={{ marginBottom: '1.5rem' }}>• Browse verified professionals in your area<br />
          • Read reviews and compare ratings<br />
          • Book services instantly<br />
          • Secure payment processing<br />
          • 24/7 customer support</p>
        <h3 style={{ color: '#667eea', margin: '2rem 0 1rem' }}>For Professionals</h3>
        <p style={{ marginBottom: '1.5rem' }}>• Grow your business with more customers<br />
          • Flexible scheduling and pricing<br />
          • Secure and timely payments<br />
          • Professional profile showcase<br />
          • Business management tools</p>
        <p style={{ marginTop: '2rem', fontWeight: 600, color: '#667eea' }}>Join thousands of satisfied customers and professionals on ServicePro!</p>
      </div>
    </div>
  </div>
);

export default AboutPage;
