import React, { useState } from 'react'

const BookingModel = ({ professionalId }) => {
  // Get today's date in YYYY-MM-DD format for minimum date
  const today = new Date().toISOString().split('T')[0];

  // Simple time slots without availability checking
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

  return (
    <>
      <div className="form-group">
        <label htmlFor="bookingDate" style={{ color: '#393737', fontWeight: '500' }}>Preferred Date</label>
        <input 
          type="date" 
          id="bookingDate" 
          name="bookingDate" 
          required 
          min={today}
          style={{
            border: '2px solid #C7EEFF',
            borderRadius: '12px',
            padding: '0.75rem',
            fontSize: '1rem',
            background: '#FFFFFF',
            color: '#393737',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4D6DE3'}
          onBlur={(e) => e.target.style.borderColor = '#C7EEFF'}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="bookingTime" style={{ color: '#393737', fontWeight: '500' }}>
          Preferred Time
        </label>
        <select 
          id="bookingTime" 
          name="bookingTime" 
          required 
          style={{
            border: '2px solid #C7EEFF',
            borderRadius: '12px',
            padding: '0.75rem',
            fontSize: '1rem',
            background: '#FFFFFF',
            color: '#393737',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#4D6DE3'}
          onBlur={(e) => e.target.style.borderColor = '#C7EEFF'}
        >
          <option value="">Select time</option>
          {timeSlots.map(slot => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
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
          onFocus={(e) => e.target.style.borderColor = '#4D6DE3'}
          onBlur={(e) => e.target.style.borderColor = '#C7EEFF'}
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
          onFocus={(e) => e.target.style.borderColor = '#4D6DE3'}
          onBlur={(e) => e.target.style.borderColor = '#C7EEFF'}
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ 
          width: '100%',
          background: '#4D6DE3',
          color: '#FFFFFF',
          border: 'none',
          padding: '0.875rem',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.background = '#393737'}
        onMouseOut={(e) => e.target.style.background = '#4D6DE3'}
      >
        Send Booking Request
      </button>
    </>
  )
}

export default BookingModel