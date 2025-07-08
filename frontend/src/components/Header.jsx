import React, { useState } from 'react';
import MobileMenu from './MobileMenu';

const Header = ({ showPage, setShowLogin, setShowSignup, user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold text-primary">ServicePro</div>

        

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center p-4">
          <li><a href="#" onClick={() => showPage('home')}>Home</a></li>
          <li><a href="#" onClick={() => showPage('professionals')}>Find Professionals</a></li>
          <li><a href="#" onClick={() => showPage('join')}>Join as Professional</a></li>
          <li><a href="#" onClick={() => showPage('about')}>About</a></li>
        </ul>

        {/* Auth Buttons (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="profile-circle bg-gradient-to-br from-blue-500 to-gray-700 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold border-2 border-sky-200">
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
              <button className="btn btn-secondary" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <a href="#" className="btn btn-secondary" onClick={() => setShowLogin(true)}>Login</a>
              <a href="#" className="btn btn-primary" onClick={() => setShowSignup(true)}>Sign Up</a>
            </>
          )}
        </div>

      {/* Mobile Nav */}
       <MobileMenu
        user={user}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        onLogout={onLogout}
        showPage={showPage}
      />
      </nav>
    </header>
  );
};

export default Header;
