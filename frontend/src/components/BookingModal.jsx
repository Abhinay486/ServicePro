import React from 'react';
import BookingModel from './BookingModel';

const BookingModal = ({ 
  showBooking, 
  setShowBooking, 
  bookingFormRef, 
  handleBookingSubmit, 
  bookingSuccess, 
  currentBookingProfessional
}) => (
  showBooking ? (
    <div id="bookingModal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(77, 109, 227, 0.1)',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(77, 109, 227, 0.15)'
      }}>
        <span className="modal-close" onClick={() => setShowBooking(false)} style={{ color: '#393737' }}>&times;</span>
        <h3 style={{ 
          marginBottom: '1.5rem', 
          color: '#393737',
          fontSize: '1.5rem',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          Book Service with {currentBookingProfessional?.name}
        </h3>
        {currentBookingProfessional && (
          <div style={{
            background: 'rgba(77, 109, 227, 0.05)',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            border: '1px solid rgba(77, 109, 227, 0.1)'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#393737' }}>
              <strong>Service:</strong> {currentBookingProfessional.service}
            </p>
            <p style={{ margin: '0 0 0.5rem 0', color: '#393737' }}>
              <strong>Location:</strong> {currentBookingProfessional.location}
            </p>
            <p style={{ margin: '0', color: '#393737' }}>
              <strong>Rate:</strong> ${currentBookingProfessional.hourlyRate}/hour
            </p>
          </div>
        )}
        <form id="bookingForm" ref={bookingFormRef} onSubmit={handleBookingSubmit}>
          <BookingModel 
            professionalId={currentBookingProfessional?._id}
          />
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
  ) : null
);

export default BookingModal;
