import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Header from "./Header";
import HomePage from "./HomePage";
import ProfessionalsPage from "./ProfessionalsPage";
import AboutPage from "./AboutPage";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import BookingModal from "./BookingModal";
import JoinProfessionalPage from "./JoinProfessionalPage";

const CustomerDashboard = (
  {
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
  showBooking,
  setShowBooking,
  bookingFormRef,
  bookingSuccess,
  currentBookingProfessional,
  showLogin,
  showSignup
}
) => {
  // Separate ref and state for professional application
    const getToken = () => localStorage.getItem('servicepro_jwt_token');
  const professionalFormRef = useRef();
  const [professionalSuccess, setProfessionalSuccess] = useState(null);

  // Booking state for BookProfessionalForm
  const [bookingSuccessState, setBookingSuccessState] = useState(null);

  // Custom handler for professional application
  const handleProfessionalSubmit = async (e) => {
    e.preventDefault();
    const form = professionalFormRef.current;
    const data = new FormData(form);
    const obj = Object.fromEntries(data);
    const hourlyRate = parseInt(obj.hourlyRate);
    if (hourlyRate < 100 || hourlyRate > 5000) {
      toast.error("Hourly rate must be between ₹100 and ₹5000");
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/professional/apply`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: obj.fullName,
          email: obj.email,
          phone: obj.phone,
          service: obj.service,
          experience: obj.experience,
          location: obj.location,
          hourlyRate: hourlyRate,
          description: obj.description,
        }),
      });
      const dataRes = await response.json();
      if (response.status === 201) {
        setProfessionalSuccess({
          name: obj.fullName,
          service: obj.service,
          location: obj.location,
        });
        form.reset();
        toast.success("Application submitted successfully!");
        setTimeout(() => {
          setProfessionalSuccess(null);
          showPage("professionals");
        }, 3000);
      } else {
        toast.error(dataRes.error || "Failed to submit application");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
  };

  // Handler for booking success
  const handleBookSuccess = (booking) => {
    setBookingSuccessState({
      name: currentBookingProfessional?.name,
      date: booking.date,
      time: booking.time,
      message: 'Booking request sent!'
    });
    setTimeout(() => {
      setBookingSuccessState(null);
      setShowBooking(false);
    }, 3000);
  };

  // Debug: log user object before rendering BookingModal
  console.log('CustomerDashboard user:', user);

  return (
    <>
      <Header
        showPage={showPage}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        user={user}
        userType={userType}
        onLogout={onLogout}
      />
      <main className="container" style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%)',
        paddingTop: '2rem'
      }}>
        {page === 'home' && (
          <HomePage
            searchService={searchService}
            setSearchService={setSearchService}
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            searchServices={searchServices}
            filterProfessionals={filterProfessionals}
            page={page}
          />
        )}
        {page === 'professionals' && (
          <ProfessionalsPage
            filteredProfessionals={filteredProfessionals}
            bookProfessional={bookProfessional}
            page={page}
          />
        )}
        {page === 'join' && (
          <JoinProfessionalPage
            professionalFormRef={professionalFormRef}
            handleProfessionalSubmit={handleProfessionalSubmit}
            professionalSuccess={professionalSuccess}
            showPage={showPage}
            page={page}
          />
        )}
        {page === 'about' && (
          <AboutPage page={page} />
        )}
      </main>
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
      <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} />
      <BookingModal
        showBooking={showBooking}
        setShowBooking={setShowBooking}
        bookingFormRef={bookingFormRef}
        bookingSuccess={bookingSuccessState}
        currentBookingProfessional={currentBookingProfessional}
        customerId={user?.userId} // Pass customerId from parent
        onSuccess={handleBookSuccess}
        professionalId={currentBookingProfessional?._id}
      />
      {/* <button className="btn btn-secondary" onClick={onLogout} style={{margin:'2rem'}}>Logout</button> */}
    </>
  );
}

export default CustomerDashboard;
