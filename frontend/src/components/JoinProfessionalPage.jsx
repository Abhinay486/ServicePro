import React from 'react';

const JoinProfessionalPage = ({ professionalFormRef, handleProfessionalSubmit, professionalSuccess, showPage, page }) => (
  <div id="join" className={`page${page === 'join' ? ' active' : ''}`} style={{
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    padding: '2rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div className="form-container" style={{
      width: '600px',
      height: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '1.5rem', 
        color: '#1d1d1f',
        fontSize: '2rem',
        fontWeight: '700',
        letterSpacing: '-0.02em',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>Join as a Professional</h2>
      <p style={{
        textAlign: 'center',
        color: '#86868b',
        fontSize: '1rem',
        marginBottom: '1.5rem',
        fontWeight: '400',
        lineHeight: '1.4',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}>Share your expertise and connect with customers in your area.</p>
      <form id="professionalForm" ref={professionalFormRef} onSubmit={handleProfessionalSubmit} style={{ flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label htmlFor="fullName" style={{ 
              color: '#1d1d1f', 
              fontWeight: '500',
              fontSize: '0.9rem',
              marginBottom: '0.4rem',
              display: 'block',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              required 
              style={{
                width: '100%',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.95rem',
                background: '#ffffff',
                color: '#1d1d1f',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d2d2d7';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={{ 
              color: '#1d1d1f', 
              fontWeight: '500',
              fontSize: '0.9rem',
              marginBottom: '0.4rem',
              display: 'block',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              style={{
                width: '100%',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.95rem',
                background: '#ffffff',
                color: '#1d1d1f',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d2d2d7';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label htmlFor="phone" style={{ 
              color: '#1d1d1f', 
              fontWeight: '500',
              fontSize: '0.9rem',
              marginBottom: '0.4rem',
              display: 'block',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              pattern="[0-9]{10}" 
              title="Please enter a valid 10-digit phone number" 
              required 
              style={{
                width: '100%',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.95rem',
                background: '#ffffff',
                color: '#1d1d1f',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d2d2d7';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="service" style={{ 
              color: '#1d1d1f', 
              fontWeight: '500',
              fontSize: '0.9rem',
              marginBottom: '0.4rem',
              display: 'block',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Service Category</label>
            <select 
              id="service" 
              name="service" 
              required 
              style={{
                width: '100%',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.95rem',
                background: '#ffffff',
                color: '#1d1d1f',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'><path fill=\'%23666\' d=\'M6 9l3-3H3z\'/></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.875rem center',
                backgroundSize: '12px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d2d2d7';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select your service</option>
              <option value="ac-repair">AC Repair & Service</option>
              <option value="plumbing">Plumbing Services</option>
              <option value="electrical">Electrical Work</option>
              <option value="appliance-repair">Appliance Repair</option>
              <option value="cleaning">Cleaning Services</option>
              <option value="pest-control">Pest Control</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group">
            <label htmlFor="experience" style={{ 
              color: '#1d1d1f', 
              fontWeight: '500',
              fontSize: '0.9rem',
              marginBottom: '0.4rem',
              display: 'block',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Years of Experience</label>
            <select 
              id="experience" 
              name="experience" 
              required 
              style={{
                width: '100%',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.95rem',
                background: '#ffffff',
                color: '#1d1d1f',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'><path fill=\'%23666\' d=\'M6 9l3-3H3z\'/></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.875rem center',
                backgroundSize: '12px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d2d2d7';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select experience</option>
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location" style={{ 
              color: '#1d1d1f', 
              fontWeight: '500',
              fontSize: '0.9rem',
              marginBottom: '0.4rem',
              display: 'block',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Service Location</label>
            <select 
              id="location" 
              name="location" 
              required 
              style={{
                width: '100%',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.95rem',
                background: '#ffffff',
                color: '#1d1d1f',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'><path fill=\'%23666\' d=\'M6 9l3-3H3z\'/></svg>")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.875rem center',
                backgroundSize: '12px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d2d2d7';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Select your city</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="chennai">Chennai</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="hourlyRate" style={{ 
              color: '#1d1d1f', 
              fontWeight: '500',
              fontSize: '0.9rem',
              marginBottom: '0.4rem',
              display: 'block',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}>Hourly Rate (₹)</label>
            <input 
              type="number" 
              id="hourlyRate" 
              name="hourlyRate" 
              min="100" 
              max="5000" 
              required 
              style={{
                width: '100%',
                border: '1px solid #d2d2d7',
                borderRadius: '8px',
                padding: '0.625rem 0.875rem',
                fontSize: '0.95rem',
                background: '#ffffff',
                color: '#1d1d1f',
                transition: 'all 0.2s ease',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d2d2d7';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="description" style={{ 
            color: '#1d1d1f', 
            fontWeight: '500',
            fontSize: '0.9rem',
            marginBottom: '0.4rem',
            display: 'block',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}>About Your Services</label>
          <textarea 
            id="description" 
            name="description" 
            rows="3" 
            placeholder="Describe your expertise and services..." 
            required
            style={{
              width: '100%',
              border: '1px solid #d2d2d7',
              borderRadius: '8px',
              padding: '0.625rem 0.875rem',
              fontSize: '0.95rem',
              background: '#ffffff',
              color: '#1d1d1f',
              transition: 'all 0.2s ease',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              outline: 'none',
              resize: 'vertical'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#007aff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d2d2d7';
              e.target.style.boxShadow = 'none';
            }}
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ 
            width: '100%', 
            padding: '0.875rem 1.5rem',
            background: '#007aff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0, 122, 255, 0.2)'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#0056b3';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 8px rgba(0, 122, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = '#007aff';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 4px rgba(0, 122, 255, 0.2)';
          }}
        >
          Submit Application
        </button>
      </form>
      {professionalSuccess && (
        <div className="success-message" style={{
          background: 'rgba(52, 199, 89, 0.1)',
          color: '#1d1d1f',
          padding: '1.5rem',
          borderRadius: '12px',
          margin: '2rem 0 0 0',
          textAlign: 'center',
          border: '1px solid rgba(52, 199, 89, 0.3)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          <h3 style={{ 
            color: '#34c759', 
            marginBottom: '0.5rem',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>Application Submitted Successfully!</h3>
          <p style={{ 
            marginBottom: '0.5rem',
            color: '#1d1d1f',
            fontSize: '1rem'
          }}>Thank you {professionalSuccess.name}! We'll review your application and contact you within 24 hours.</p>
          <p style={{ 
            marginBottom: '0.25rem',
            color: '#86868b',
            fontSize: '0.95rem'
          }}>Service: {professionalSuccess.service.replace('-', ' ')}</p>
          <p style={{ 
            margin: '0',
            color: '#86868b',
            fontSize: '0.95rem'
          }}>Location: {professionalSuccess.location}</p>
        </div>
      )}
    </div>
  </div>
);

export default JoinProfessionalPage;
