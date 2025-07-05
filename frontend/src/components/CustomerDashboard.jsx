import React from "react";
import Header from "./Header";
import HomePage from "./HomePage";
import ProfessionalsPage from "./ProfessionalsPage";
import JoinProfessionalPage from "./JoinProfessionalPage";
import AboutPage from "./AboutPage";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import BookingModal from "./BookingModal";

const CustomerDashboard = ({
  user,
  userType,
  onLogout,
  showPage,
  setShowLogin,
  setShowSignup,
  searchService,
  setSearchService,
  searchLocation,
  setSearchLocation,
  searchServices,
  filterProfessionals,
  page,
  filteredProfessionals,
  bookProfessional,
  professionalFormRef,
  handleProfessionalSubmit,
  professionalSuccess,
  showBooking,
  setShowBooking,
  bookingFormRef,
  handleBookingSubmit,
  bookingSuccess,
  currentBookingProfessional,
  showLogin,
  showSignup
}) => (
  <>
    <Header
      showPage={showPage}
      setShowLogin={setShowLogin}
      setShowSignup={setShowSignup}
      user={user}
      userType={userType}
      onLogout={onLogout}
    />
    <main className="container">
      <HomePage
        searchService={searchService}
        setSearchService={setSearchService}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        searchServices={searchServices}
        filterProfessionals={filterProfessionals}
        page={page}
      />
      <ProfessionalsPage
        filteredProfessionals={filteredProfessionals}
        bookProfessional={bookProfessional}
        page={page}
      />
      <JoinProfessionalPage
        professionalFormRef={professionalFormRef}
        handleProfessionalSubmit={handleProfessionalSubmit}
        professionalSuccess={professionalSuccess}
        showPage={showPage}
        page={page}
      />
      <AboutPage page={page} />
    </main>
    <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
    <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} />
    <BookingModal
      showBooking={showBooking}
      setShowBooking={setShowBooking}
      bookingFormRef={bookingFormRef}
      handleBookingSubmit={handleBookingSubmit}
      bookingSuccess={bookingSuccess}
      currentBookingProfessional={currentBookingProfessional}
    />
    {/* <button className="btn btn-secondary" onClick={onLogout} style={{margin:'2rem'}}>Logout</button> */}
  </>
);

export default CustomerDashboard;
