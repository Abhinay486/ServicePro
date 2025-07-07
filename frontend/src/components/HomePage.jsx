import React from 'react';

const HomePage = ({ searchService, setSearchService, searchLocation, setSearchLocation, searchServices, filterProfessionals, page }) => (
  <div id="home" className={`page${page === 'home' ? ' active' : ''}`}>
    <section className="hero">
      <h1>Find Expert Professionals Near You</h1>
      <p>Book experienced technicians, mechanics, and service professionals with just a few clicks</p>
      <div className="search-box">
        <input type="text" placeholder="What service do you need?" value={searchService} onChange={e => setSearchService(e.target.value)} />
        <select value={searchLocation} onChange={e => setSearchLocation(e.target.value)}>
          <option value="">Select your location</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="bangalore">Bangalore</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="chennai">Chennai</option>
        </select>
        <button className="btn btn-primary" onClick={searchServices}>Search</button>
      </div>
    </section>
    <section className="categories">
      <div className="category-card" onClick={() => filterProfessionals('ac-repair')}>
        <div className="category-icon">❄</div>
        <h3>AC Repair & Service</h3>
        <p>Expert technicians for AC installation, repair, and maintenance</p>
      </div>
      <div className="category-card" onClick={() => filterProfessionals('plumbing')}>
        <div className="category-icon">🔧</div>
        <h3>Plumbing Services</h3>
        <p>Professional plumbers for all your water and drainage needs</p>
      </div>
      <div className="category-card" onClick={() => filterProfessionals('electrical')}>
        <div className="category-icon">⚡</div>
        <h3>Electrical Work</h3>
        <p>Licensed electricians for safe and reliable electrical services</p>
      </div>
      <div className="category-card" onClick={() => filterProfessionals('appliance-repair')}>
        <div className="category-icon">🔨</div>
        <h3>Appliance Repair</h3>
        <p>Fix your washing machines, refrigerators, and other appliances</p>
      </div>
      <div className="category-card" onClick={() => filterProfessionals('cleaning')}>
        <div className="category-icon">🧹</div>
        <h3>Cleaning Services</h3>
        <p>Professional cleaning for homes and offices</p>
      </div>
      <div className="category-card" onClick={() => filterProfessionals('pest-control')}>
        <div className="category-icon">🐛</div>
        <h3>Pest Control</h3>
        <p>Safe and effective pest control solutions</p>
      </div>
    </section>
  </div>
);

export default HomePage;
