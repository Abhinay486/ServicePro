import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  // State for navigation and professionals
  const [page, setPage] = useState('home');
  const [professionals, setProfessionals] = useState([]);
  const [nextProfessionalId, setNextProfessionalId] = useState(1);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [currentBookingProfessional, setCurrentBookingProfessional] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [professionalSuccess, setProfessionalSuccess] = useState(null);
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);

  // Refs for forms
  const professionalFormRef = useRef();
  const bookingFormRef = useRef();

  // Load professionals from localStorage or use sample data
  useEffect(() => {
    const storedProfessionals = localStorage.getItem('professionals');
    if (storedProfessionals) {
      const pros = JSON.parse(storedProfessionals);
      setProfessionals(pros);
      setNextProfessionalId(Math.max(...pros.map(p => p.id)) + 1);
    } else {
      const samplePros = [
        {
          id: 1,
          name: 'Rajesh Kumar',
          service: 'ac-repair',
          experience: '8 years',
          rating: 4.8,
          reviews: 156,
          hourlyRate: 350,
          location: 'mumbai',
          description: 'Expert AC technician specializing in all brands. Quick diagnosis and reliable repairs.'
        },
        {
          id: 2,
          name: 'Priya Sharma',
          service: 'cleaning',
          experience: '5 years',
          rating: 4.9,
          reviews: 89,
          hourlyRate: 200,
          location: 'delhi',
          description: 'Professional house cleaning with eco-friendly products. Trusted by 200+ families.'
        },
        {
          id: 3,
          name: 'Mohammed Ali',
          service: 'plumbing',
          experience: '12 years',
          rating: 4.7,
          reviews: 203,
          hourlyRate: 300,
          location: 'bangalore',
          description: 'Licensed plumber with expertise in modern plumbing systems and emergency repairs.'
        },
        {
          id: 4,
          name: 'Sunita Patel',
          service: 'electrical',
          experience: '6 years',
          rating: 4.6,
          reviews: 92,
          hourlyRate: 400,
          location: 'hyderabad',
          description: 'Certified electrician for home and office electrical work. Safety guaranteed.'
        },
        {
          id: 5,
          name: 'Amit Singh',
          service: 'appliance-repair',
          experience: '10 years',
          rating: 4.8,
          reviews: 134,
          hourlyRate: 250,
          location: 'chennai',
          description: 'Specialist in washing machine, refrigerator, and microwave repairs. Same-day service.'
        },
        {
          id: 6,
          name: 'Kavitha Reddy',
          service: 'pest-control',
          experience: '4 years',
          rating: 4.5,
          reviews: 67,
          hourlyRate: 180,
          location: 'mumbai',
          description: 'Safe and effective pest control solutions for homes and offices. Chemical-free options available.'
        }
      ];
      setProfessionals(samplePros);
      setNextProfessionalId(samplePros.length + 1);
      localStorage.setItem('professionals', JSON.stringify(samplePros));
    }
  }, []);

  // Filter professionals for display
  useEffect(() => {
    let filtered = professionals;
    if (categoryFilter) {
      filtered = filtered.filter(pro => pro.service === categoryFilter);
    }
    if (searchService) {
      filtered = filtered.filter(pro =>
        pro.service.includes(searchService.toLowerCase()) ||
        pro.name.toLowerCase().includes(searchService.toLowerCase()) ||
        pro.description.toLowerCase().includes(searchService.toLowerCase())
      );
    }
    if (searchLocation) {
      filtered = filtered.filter(pro => pro.location === searchLocation);
    }
    setFilteredProfessionals(filtered);
  }, [professionals, categoryFilter, searchService, searchLocation]);

  // Navigation
  const showPage = (pageId) => {
    setPage(pageId);
    if (pageId === 'professionals') {
      setCategoryFilter(null);
      setSearchService('');
      setSearchLocation('');
    }
  };

  // Modal controls
  const closeModal = (modal) => {
    if (modal === 'loginModal') setShowLogin(false);
    if (modal === 'signupModal') setShowSignup(false);
    if (modal === 'bookingModal') setShowBooking(false);
  };

  // Professional form submit
  const handleProfessionalSubmit = (e) => {
    e.preventDefault();
    const form = professionalFormRef.current;
    const data = new FormData(form);
    const obj = Object.fromEntries(data);
    const hourlyRate = parseInt(obj.hourlyRate);
    if (hourlyRate < 100 || hourlyRate > 5000) {
      alert('Hourly rate must be between ₹100 and ₹5000');
      return;
    }
    const newProfessional = {
      id: nextProfessionalId,
      name: obj.fullName,
      service: obj.service,
      experience: obj.experience,
      rating: 0,
      reviews: 0,
      hourlyRate: hourlyRate,
      location: obj.location,
      description: obj.description
    };
    const updatedPros = [...professionals, newProfessional];
    setProfessionals(updatedPros);
    setNextProfessionalId(nextProfessionalId + 1);
    localStorage.setItem('professionals', JSON.stringify(updatedPros));
    setProfessionalSuccess({
      name: obj.fullName,
      service: obj.service,
      location: obj.location
    });
    form.reset();
    setTimeout(() => {
      setProfessionalSuccess(null);
      showPage('professionals');
    }, 3000);
  };

  // Booking form submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const form = bookingFormRef.current;
    const date = form.bookingDate.value;
    const time = form.bookingTime.value;
    setBookingSuccess({
      name: currentBookingProfessional ? currentBookingProfessional.name : 'the professional',
      date,
      time
    });
    form.reset();
    setTimeout(() => {
      setBookingSuccess(null);
      setShowBooking(false);
    }, 4000);
  };

  // Book professional
  const bookProfessional = (pro) => {
    setCurrentBookingProfessional(pro);
    setShowBooking(true);
    setBookingSuccess(null);
  };

  // Category filter
  const filterProfessionals = (category) => {
    setCategoryFilter(category);
    setPage('professionals');
  };

  // Search
  const searchServices = () => {
    setPage('professionals');
  };

  // Close modal on outside click
  useEffect(() => {
    const handleClick = (event) => {
      if (showLogin && event.target.id === 'loginModal') setShowLogin(false);
      if (showSignup && event.target.id === 'signupModal') setShowSignup(false);
      if (showBooking && event.target.id === 'bookingModal') setShowBooking(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [showLogin, showSignup, showBooking]);

  // Render
  return (
    <>
      <header>
        <nav className="container">
          <div className="logo">ServicePro</div>
          <ul>
            <li><a href="#" onClick={() => showPage('home')}>Home</a></li>
            <li><a href="#" onClick={() => showPage('professionals')}>Find Professionals</a></li>
            <li><a href="#" onClick={() => showPage('join')}>Join as Professional</a></li>
            <li><a href="#" onClick={() => showPage('about')}>About</a></li>
          </ul>
          <div className="auth-buttons">
            <a href="#" className="btn btn-secondary" onClick={() => setShowLogin(true)}>Login</a>
            <a href="#" className="btn btn-primary" onClick={() => setShowSignup(true)}>Sign Up</a>
          </div>
        </nav>
      </header>

      <main className="container">
        {/* Home Page */}
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

        {/* Professionals Page */}
        <div id="professionals" className={`page${page === 'professionals' ? ' active' : ''}`}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>Available Professionals</h2>
          <div className="professionals-grid" id="professionalsGrid">
            {filteredProfessionals.map(pro => (
              <div className="professional-card" key={pro.id}>
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

        {/* Join as Professional Page */}
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

        {/* About Page */}
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
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div id="loginModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowLogin(false)}>&times;</span>
            <h3 style={{ marginBottom: '1.5rem' }}>Login to ServicePro</h3>
            <form id="loginForm" onSubmit={e => { e.preventDefault(); alert('Login successful! Welcome back to ServicePro.'); setShowLogin(false); }}>
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
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div id="signupModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowSignup(false)}>&times;</span>
            <h3 style={{ marginBottom: '1.5rem' }}>Sign Up for ServicePro</h3>
            <form id="signupForm" onSubmit={e => { e.preventDefault(); alert('Account created successfully! Welcome to ServicePro'); setShowSignup(false); }}>
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
      )}

      {/* Booking Modal */}
      {showBooking && (
        <div id="bookingModal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="modal-close" onClick={() => setShowBooking(false)}>&times;</span>
            <h3 style={{ marginBottom: '1.5rem' }}>Book Service</h3>
            <form id="bookingForm" ref={bookingFormRef} onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label htmlFor="bookingDate">Preferred Date</label>
                <input type="date" id="bookingDate" name="bookingDate" required />
              </div>
              <div className="form-group">
                <label htmlFor="bookingTime">Preferred Time</label>
                <select id="bookingTime" name="bookingTime" required>
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="serviceDetails">Service Details</label>
                <textarea id="serviceDetails" name="serviceDetails" rows="3" placeholder="Describe what you need help with..."></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="customerAddress">Your Address</label>
                <textarea id="customerAddress" name="customerAddress" rows="2" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Confirm Booking</button>
            </form>
            {bookingSuccess && (
              <div className="success-message">
                <h3>Booking Confirmed!</h3>
                <p>Your booking with <strong>{bookingSuccess.name}</strong> is confirmed for <strong>{bookingSuccess.date}</strong> at <strong>{bookingSuccess.time}</strong>.</p>
                <p>They will contact you soon. Thank you for choosing ServicePro!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
