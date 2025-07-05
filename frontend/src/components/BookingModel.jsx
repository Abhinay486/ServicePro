import React from 'react'

const BookingModel = () => {
  return (
    <>
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
    </>
  )
}

export default BookingModel