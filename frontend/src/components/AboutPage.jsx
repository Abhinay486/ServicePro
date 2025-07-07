import React from 'react';

const AboutPage = ({ page }) => (
  <div id="about" className={`page${page === 'about' ? ' active' : ''}`}>
    <div className="form-container" style={{
      maxWidth: '800px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '3rem',
      borderRadius: '24px',
      boxShadow: '0 10px 30px rgba(77, 109, 227, 0.15)',
      border: '1px solid rgba(77, 109, 227, 0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '2rem', 
        color: '#393737',
        fontSize: '2.5rem',
        fontWeight: '600'
      }}>About ServicePro</h2>
      <div style={{ textAlign: 'center', lineHeight: 1.8 }}>
        <p style={{ 
          marginBottom: '1.5rem', 
          color: '#393737', 
          fontSize: '1.1rem',
          opacity: 0.9
        }}>
          ServicePro is your trusted platform for connecting with experienced professionals and technicians in your area. We make it easy to find, book, and pay for quality services.
        </p>
        <h3 style={{ 
          color: '#4D6DE3', 
          margin: '2rem 0 1rem',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>For Customers</h3>
        <p style={{ 
          marginBottom: '1.5rem', 
          color: '#393737',
          opacity: 0.8,
          textAlign: 'left',
          background: 'rgba(77, 109, 227, 0.05)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(77, 109, 227, 0.1)'
        }}>
          • Browse verified professionals in your area<br />
          • Read reviews and compare ratings<br />
          • Book services instantly<br />
          • Secure payment processing<br />
          • 24/7 customer support
        </p>
        <h3 style={{ 
          color: '#4D6DE3', 
          margin: '2rem 0 1rem',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>For Professionals</h3>
        <p style={{ 
          marginBottom: '1.5rem', 
          color: '#393737',
          opacity: 0.8,
          textAlign: 'left',
          background: 'rgba(199, 238, 255, 0.3)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid rgba(199, 238, 255, 0.5)'
        }}>
          • Grow your business with more customers<br />
          • Flexible scheduling and pricing<br />
          • Secure and timely payments<br />
          • Professional profile showcase<br />
          • Business management tools
        </p>
        <p style={{ 
          marginTop: '2rem', 
          fontWeight: 600, 
          color: '#4D6DE3',
          fontSize: '1.2rem',
          background: 'rgba(241, 252, 253, 0.8)',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid rgba(241, 252, 253, 0.8)'
        }}>
          Join thousands of satisfied customers and professionals on ServicePro!
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;
