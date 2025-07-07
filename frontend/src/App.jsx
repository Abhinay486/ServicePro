import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { decipher } from "./utils/cipher";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ProfessionalsPage from "./components/ProfessionalsPage";
import JoinProfessionalPage from "./components/JoinProfessionalPage";
import AboutPage from "./components/AboutPage";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import BookingModal from "./components/BookingModal";
import CustomerDashboard from "./components/CustomerDashboard";
import ProfessionalDashboard from "./components/ProfessionalDashboard";
import ToastProvider from "./components/ToastProvider";
import { toast } from "react-hot-toast";
import "./App.css";

function App() {
  // State for navigation and professionals
  const [page, setPage] = useState("home");
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [currentBookingProfessional, setCurrentBookingProfessional] =
    useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [professionalSuccess, setProfessionalSuccess] = useState(null);
  const [searchService, setSearchService] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  // Refs for forms
  const professionalFormRef = useRef();
  const bookingFormRef = useRef();

  // Load professionals from backend
  const loadProfessionals = async () => {
    try {
      // Use Vite env variable or fallback to localhost
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/professionals`);
      setProfessionals(data);
    } catch (error) {
      console.error('Failed to load professionals:', error);
    }
  };
  useEffect(() => {
    loadProfessionals();
  }, []);

  // Filter professionals for display
  useEffect(() => {
    let filtered = professionals;
    if (categoryFilter) {
      filtered = filtered.filter((pro) => pro.service === categoryFilter);
    }
    if (searchService) {
      filtered = filtered.filter(
        (pro) =>
          pro.service.includes(searchService.toLowerCase()) ||
          pro.name.toLowerCase().includes(searchService.toLowerCase()) ||
          pro.description.toLowerCase().includes(searchService.toLowerCase())
      );
    }
    if (searchLocation) {
      filtered = filtered.filter((pro) => pro.location === searchLocation);
    }
    setFilteredProfessionals(filtered);
  }, [professionals, categoryFilter, searchService, searchLocation]);

  // Navigation
  const showPage = (pageId) => {
    setPage(pageId);
    if (pageId === "professionals") {
      setCategoryFilter(null);
      setSearchService("");
      setSearchLocation("");
    }
  };


  // Professional form submit
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
    // Send data to backend using axios
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/professionals/apply`,
        {
          name: obj.fullName,
          email: obj.email,
          phone: obj.phone,
          service: obj.service,
          experience: obj.experience,
          location: obj.location,
          hourlyRate: hourlyRate,
          description: obj.description,
        }
      );
      if (response.status === 201) {
        setProfessionalSuccess({
          name: obj.fullName,
          service: obj.service,
          location: obj.location,
        });
        form.reset();
        setTimeout(() => {
          setProfessionalSuccess(null);
          showPage("professionals");
        }, 3000);
      } else {
        toast.error(response.data.error || "Failed to submit application");
      }
    } catch (err) {
      toast.error(
        (err.response && err.response.data && err.response.data.error) ||
          "Network error. Please try again."
      );
    }
  };

  // Removed availability checking to simplify booking process

  // Booking form submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in as a customer
    if (!user || userType !== 'customer') {
      alert('Please log in as a customer to book a service.');
      setShowLogin(true);
      return;
    }

    const form = bookingFormRef.current;
    const date = form.bookingDate.value;
    const time = form.bookingTime.value;
    const serviceDetails = form.serviceDetails.value;
    const customerAddress = form.customerAddress.value;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: user.userId,
          professionalId: currentBookingProfessional._id,
          date,
          time,
          service: serviceDetails,
          notes: serviceDetails,
          customerAddress
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setBookingSuccess({
          name: currentBookingProfessional.name,
          date,
          time,
          message: data.message
        });
        form.reset();
        setTimeout(() => {
          setBookingSuccess(null);
          setShowBooking(false);
        }, 6000);
      } else {
        alert(data.error || 'Failed to submit booking request');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking request. Please try again.');
    }
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
    setPage("professionals");
  };

  // Search
  const searchServices = () => {
    setPage("professionals");
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setUserType(null);
    setPage("home");
  };

  // Close modal on outside click
  useEffect(() => {
    const handleClick = (event) => {
      if (showLogin && event.target.id === "loginModal") setShowLogin(false);
      if (showSignup && event.target.id === "signupModal") setShowSignup(false);
      if (showBooking && event.target.id === "bookingModal")
        setShowBooking(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [showLogin, showSignup, showBooking]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("servicepro_user");
    const storedUserType = localStorage.getItem("servicepro_userType");
    const loginEmail = localStorage.getItem("servicepro_login_email");
    const loginPasswordCipher = localStorage.getItem("servicepro_login_password");
    if (storedUser && storedUserType) {
      try {
        const userObj = JSON.parse(storedUser);
        setUser(userObj);
        setUserType(storedUserType);
      } catch {}
    } else if (loginEmail && loginPasswordCipher) {
      // Try auto-login with ciphered credentials
      const loginPassword = decipher(loginPasswordCipher);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      axios.post(`${backendUrl}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword
      })
        .then(res => {
          setUser({ email: loginEmail, userId: res.data.userId });
          setUserType(res.data.userType);
          toast.success("Auto-login successful!");
        })
        .catch(() => {
          localStorage.removeItem("servicepro_login_email");
          localStorage.removeItem("servicepro_login_password");
        });
    }
  }, []);

  // Save user to localStorage on login
  useEffect(() => {
    if (user && userType) {
      localStorage.setItem("servicepro_user", JSON.stringify(user));
      localStorage.setItem("servicepro_userType", userType);
    } else {
      localStorage.removeItem("servicepro_user");
      localStorage.removeItem("servicepro_userType");
    }
  }, [user, userType]);

  // Render
  return (
    <>
      <ToastProvider />
      {!user && (
        <>
          <Header
            showPage={showPage}
            setShowLogin={setShowLogin}
            setShowSignup={setShowSignup}
            user={user}
            userType={userType}
            onLogout={handleLogout}
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
          <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} setUser={setUser} setUserType={setUserType} />
          <SignupModal showSignup={showSignup} setShowSignup={setShowSignup} />
          <BookingModal          showBooking={showBooking}
          setShowBooking={setShowBooking}
          bookingFormRef={bookingFormRef}
          handleBookingSubmit={handleBookingSubmit}
          bookingSuccess={bookingSuccess}
          currentBookingProfessional={currentBookingProfessional}
        />
        </>
      )}
      {user && userType === "customer" && (
        <CustomerDashboard
          user={user}
          onLogout={handleLogout}
          showPage={showPage}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
          searchService={searchService}
          setSearchService={setSearchService}
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          searchServices={searchServices}
          filterProfessionals={filterProfessionals}
          page={page}
          filteredProfessionals={filteredProfessionals}
          bookProfessional={bookProfessional}
          showBooking={showBooking}
          setShowBooking={setShowBooking}
          bookingFormRef={bookingFormRef}
          handleBookingSubmit={handleBookingSubmit}
          bookingSuccess={bookingSuccess}
          currentBookingProfessional={currentBookingProfessional}
          showLogin={showLogin}
          showSignup={showSignup}
          userType={userType}
        />
      )}
      {user && userType === "professional" && (
        <ProfessionalDashboard user={user} onLogout={handleLogout} userType={userType} />
      )}
    </>
  );
}

export default App;
