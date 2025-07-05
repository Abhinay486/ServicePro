import React from 'react';
import BookingModel from './BookingModel';

const BookingModal = ({ showBooking, setShowBooking, bookingFormRef, handleBookingSubmit, bookingSuccess, currentBookingProfessional }) => (
  showBooking ? (
    <div id="bookingModal" className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="modal-close" onClick={() => setShowBooking(false)}>&times;</span>
        <h3 style={{ marginBottom: '1.5rem' }}>Book Service</h3>
        <form id="bookingForm" ref={bookingFormRef} onSubmit={handleBookingSubmit}>
          <BookingModel />
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
  ) : null
);

export default BookingModal;
