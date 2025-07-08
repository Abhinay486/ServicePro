import React, { useState } from 'react';

export default function MobileMenu({ user, setShowLogin, setShowSignup, onLogout, showPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mobile-menu">
      {/* Toggle Button */}
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="menu-toggle"
      >
        <svg
          className="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="dropdown">
          <a onClick={() => { showPage('home'); setMenuOpen(false); }} className="link">Home</a>
          <a onClick={() => { showPage('professionals'); setMenuOpen(false); }} className="link">Find Professionals</a>
          <a onClick={() => { showPage('join'); setMenuOpen(false); }} className="link">Join as Professional</a>
          <a onClick={() => { showPage('about'); setMenuOpen(false); }} className="link">About</a>

          <div className="auth-section">
            {user ? (
              <div className="user-info">
                <span className="user-email">{user.email}</span>
                <button onClick={onLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="login-btn" onClick={() => { setShowLogin(true); setMenuOpen(false); }}>Login</button>
                <button className="signup-btn" onClick={() => { setShowSignup(true); setMenuOpen(false); }}>Sign Up</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Inline CSS */}
      <style>{`
        .mobile-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-menu {
            display: block;
          }
        }

        .menu-toggle {
          background: none;
          border: none;
          cursor: pointer;
        }

        .icon {
          width: 24px;
          height: 24px;
          stroke: #333;
        }

        .dropdown {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-top: 10px;
          padding: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .link {
          display: block;
          padding: 8px 0;
          color: #333;
          text-decoration: none;
          cursor: pointer;
        }

        .link:hover {
          background-color: #f5f5f5;
        }

        .auth-section {
          border-top: 1px solid #ddd;
          margin-top: 12px;
          padding-top: 12px;
        }

        .user-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }

        .user-email {
          color: #555;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .logout-btn {
          background: #ff4d4d;
          border: none;
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #e60000;
        }

        .auth-buttons button {
          display: block;
          width: 100%;
          margin-bottom: 8px;
          padding: 8px;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        }

        .login-btn {
          background: #666;
          color: white;
        }

        .login-btn:hover {
          background: #444;
        }

        .signup-btn {
          background: #007bff;
          color: white;
        }

        .signup-btn:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
}
