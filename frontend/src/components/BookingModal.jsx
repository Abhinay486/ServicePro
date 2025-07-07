import React, { useState } from 'react';

const BookingModal = ({ 
  showBooking, 
  setShowBooking, 
  bookingSuccess, 
  currentBookingProfessional, 
  onSuccess,
  professionalId,
  customerId // <-- add customerId prop
}) => {
  // Form state
  const today = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
    const getToken = () => localStorage.getItem('servicepro_jwt_token');

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      console.log('BookingModal customerId:', customerId); // Debug log
      const token = getToken();
      if (!token) throw new Error('You must be logged in to book a service.');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId, // passed as prop
          professionalId: professionalId || currentBookingProfessional?._id,
          date: bookingDate,
          time: bookingTime,
          service: serviceDetails,
          notes,
          customerAddress
        })
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.error || 'Booking failed.');
      setSuccess(data.message || 'Booking request sent!');
      setBookingDate('');
      setBookingTime('');
      setServiceDetails('');
      setCustomerAddress('');
      setNotes('');
      if (onSuccess) onSuccess(data.booking);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!showBooking) return null;

  return (
    <div id="bookingModal" className="modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.08)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
    }}>
      <div className="modal-content" style={{
        background: 'rgba(255, 255, 255, 0.97)',
        border: '1px solid rgba(77, 109, 227, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(77, 109, 227, 0.15)',
        padding: '2.5rem 2rem 2rem 2rem',
        width: '100%',
        maxWidth: 420,
        minWidth: 320,
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}>
        <span className="modal-close" onClick={() => setShowBooking(false)} style={{ color: '#393737', position: 'absolute', top: 18, right: 24, fontSize: 28, cursor: 'pointer' }}>&times;</span>
        <div style={{
          marginBottom: '0.5rem',
          padding: '0.5rem 0 1.2rem 0',
          borderBottom: '1px solid #E3EAFD',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.2rem',
        }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4D6DE3', marginBottom: 2 }}>
            Book Service
          </div>
          <div style={{ fontSize: '1.1rem', color: '#393737', fontWeight: 500 }}>
            with <span style={{ color: '#222', fontWeight: 700 }}>{currentBookingProfessional?.name || 'Professional'}</span>
          </div>
          {currentBookingProfessional?.service && (
            <div style={{ fontSize: '1rem', color: '#4D6DE3', fontWeight: 500 }}>
              {currentBookingProfessional.service}
            </div>
          )}
          {currentBookingProfessional?.location && (
            <div style={{ fontSize: '0.98rem', color: '#888', fontWeight: 400 }}>
              {currentBookingProfessional.location}
            </div>
          )}
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}>
          <div className="form-group">
            <label htmlFor="bookingDate" style={{ color: '#393737', fontWeight: '500' }}>Preferred Date</label>
            <input
              type="date"
              id="bookingDate"
              name="bookingDate"
              required
              min={today}
              value={bookingDate}
              onChange={e => setBookingDate(e.target.value)}
              style={{
                border: '2px solid #C7EEFF',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '1rem',
                background: '#FFFFFF',
                color: '#393737',
                transition: 'all 0.3s ease'
              }}
              onFocus={e => e.target.style.borderColor = '#4D6DE3'}
              onBlur={e => e.target.style.borderColor = '#C7EEFF'}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bookingTime" style={{ color: '#393737', fontWeight: '500' }}>Preferred Time</label>
            <select
              id="bookingTime"
              name="bookingTime"
              required
              value={bookingTime}
              onChange={e => setBookingTime(e.target.value)}
              style={{
                border: '2px solid #C7EEFF',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '1rem',
                background: '#FFFFFF',
                color: '#393737',
                transition: 'all 0.3s ease'
              }}
              onFocus={e => e.target.style.borderColor = '#4D6DE3'}
              onBlur={e => e.target.style.borderColor = '#C7EEFF'}
            >
              <option value="">Select time</option>
              {timeSlots.map(slot => (
                <option key={slot.value} value={slot.value}>{slot.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="serviceDetails" style={{ color: '#393737', fontWeight: '500' }}>Service Details</label>
            <textarea
              id="serviceDetails"
              name="serviceDetails"
              rows="3"
              placeholder="Describe what you need help with..."
              required
              value={serviceDetails}
              onChange={e => setServiceDetails(e.target.value)}
              style={{
                border: '2px solid #C7EEFF',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '1rem',
                background: '#FFFFFF',
                color: '#393737',
                transition: 'all 0.3s ease',
                resize: 'vertical'
              }}
              onFocus={e => e.target.style.borderColor = '#4D6DE3'}
              onBlur={e => e.target.style.borderColor = '#C7EEFF'}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="customerAddress" style={{ color: '#393737', fontWeight: '500' }}>Your Address</label>
            <textarea
              id="customerAddress"
              name="customerAddress"
              rows="2"
              required
              placeholder="Enter your full address where service is needed..."
              value={customerAddress}
              onChange={e => setCustomerAddress(e.target.value)}
              style={{
                border: '2px solid #C7EEFF',
                borderRadius: '12px',
                padding: '0.75rem',
                fontSize: '1rem',
                background: '#FFFFFF',
                color: '#393737',
                transition: 'all 0.3s ease',
                resize: 'vertical'
              }}
              onFocus={e => e.target.style.borderColor = '#4D6DE3'}
              onBlur={e => e.target.style.borderColor = '#C7EEFF'}
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              background: loading ? '#A0A0A0' : '#4D6DE3',
              color: '#FFFFFF',
              border: 'none',
              padding: '0.875rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            disabled={loading}
            onMouseOver={e => { if (!loading) e.target.style.background = '#393737'; }}
            onMouseOut={e => { if (!loading) e.target.style.background = '#4D6DE3'; }}
          >
            {loading ? 'Sending...' : 'Send Booking Request'}
          </button>
        </form>
        {bookingSuccess && (
          <div className="success-message" style={{
            background: 'rgba(77, 109, 227, 0.1)',
            color: '#393737',
            padding: '1.5rem',
            borderRadius: '12px',
            margin: '1rem 0',
            textAlign: 'center',
            border: '1px solid rgba(77, 109, 227, 0.2)'
          }}>
            <h3 style={{ color: '#4D6DE3', marginBottom: '0.5rem' }}>Booking Request Sent!</h3>
            <p>Your booking request with <strong>{bookingSuccess.name}</strong> for <strong>{bookingSuccess.date}</strong> at <strong>{bookingSuccess.time}</strong> has been sent.</p>
            <p>{bookingSuccess.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
