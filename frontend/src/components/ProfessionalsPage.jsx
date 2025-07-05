import React from 'react';

const ProfessionalsPage = ({ filteredProfessionals, bookProfessional, page }) => (
  <div id="professionals" className={`page${page === 'professionals' ? ' active' : ''}`}>
    <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Available Professionals</h2>
    <div className="professionals-grid" id="professionalsGrid">
      {filteredProfessionals.map((pro, idx) => (
        <div className="professional-card" key={pro.id || idx}>
          <div className="professional-header">
            <div className="professional-avatar">{pro.name.charAt(0)}</div>
            <div>
              <h3>{pro.name}</h3>
              <p style={{ color: '#666', textTransform: 'capitalize' }}>{pro.service.replace('-', ' ')}</p>
            </div>
          </div>
          <div className="rating">
            {'★'.repeat(Math.floor(pro.rating))} {pro.rating} ({pro.reviews} reviews)
          </div>
          <p style={{ margin: '1rem 0', color: '#666' }}>{pro.description}</p>
          <p><strong>Experience:</strong> {pro.experience}</p>
          <p><strong>Location:</strong> {pro.location.charAt(0).toUpperCase() + pro.location.slice(1)}</p>
          <div className="price-tag">₹{pro.hourlyRate}/hour</div>
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => bookProfessional(pro)}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ProfessionalsPage;
