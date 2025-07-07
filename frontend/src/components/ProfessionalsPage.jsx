import React from 'react';

const ProfessionalsPage = ({ filteredProfessionals, bookProfessional, page }) => (
  <div id="professionals" className={`page${page === 'professionals' ? ' active' : ''}`}>
    <h2 style={{ 
      color: '#393737', 
      textAlign: 'center', 
      marginBottom: '2rem',
      fontSize: '2.5rem',
      fontWeight: '600'
    }}>Available Professionals</h2>
    <div className="professionals-grid" id="professionalsGrid">
      {filteredProfessionals.map((pro, idx) => (
        <div className="professional-card" key={pro.id || idx} style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '2rem',
          transition: 'all 0.3s ease',
          border: '1px solid rgba(77, 109, 227, 0.1)',
          boxShadow: '0 4px 20px rgba(77, 109, 227, 0.1)'
        }}>
          <div className="professional-header">
            <div className="professional-avatar" style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #4D6DE3, #393737)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              border: '2px solid #C7EEFF'
            }}>
              {pro.name.charAt(0)}
            </div>
            <div>
              <h3 style={{ color: '#393737', margin: '0 0 0.5rem 0' }}>{pro.name}</h3>
              <p style={{ color: '#4D6DE3', textTransform: 'capitalize', margin: 0, fontWeight: '500' }}>
                {pro.service.replace('-', ' ')}
              </p>
            </div>
          </div>
          <div className="rating" style={{ color: '#4D6DE3', margin: '1rem 0 0.5rem 0' }}>
            {'★'.repeat(Math.floor(pro.rating))} {pro.rating} ({pro.reviews} reviews)
          </div>
          <p style={{ margin: '1rem 0', color: '#393737', opacity: 0.8 }}>{pro.description}</p>
          <p style={{ color: '#393737', marginBottom: '0.5rem' }}>
            <strong>Experience:</strong> {pro.experience}
          </p>
          <p style={{ color: '#393737', marginBottom: '1rem' }}>
            <strong>Location:</strong> {pro.location.charAt(0).toUpperCase() + pro.location.slice(1)}
          </p>
          <div className="price-tag" style={{
            background: 'rgba(77, 109, 227, 0.1)',
            color: '#4D6DE3',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            fontWeight: '600',
            display: 'inline-block',
            margin: '0.5rem 0',
            fontSize: '0.95rem',
            border: '1px solid rgba(77, 109, 227, 0.2)'
          }}>
            ₹{pro.hourlyRate}/hour
          </div>
          <button 
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              marginTop: '1rem',
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
            onClick={() => bookProfessional(pro)}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ProfessionalsPage;
