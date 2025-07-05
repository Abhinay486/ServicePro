import React from 'react';

const Header = ({ showPage, setShowLogin, setShowSignup, user, onLogout }) => (
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
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="profile-circle" style={{ width: 36, height: 36, borderRadius: '50%', background: '#667eea', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
              {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
            <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <>
            <a href="#" className="btn btn-secondary" onClick={() => setShowLogin(true)}>Login</a>
            <a href="#" className="btn btn-primary" onClick={() => setShowSignup(true)}>Sign Up</a>
          </>
        )}
      </div>
    </nav>
  </header>
);

export default Header;
