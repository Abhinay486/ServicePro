import { Customer, Professional, Booking } from '../models/model.js';

// Book a service
export const bookService = async (req, res) => {
  try {
    const { id: customerId } = req.params;
    const { professionalId, date, time, service, notes, customerAddress } = req.body;

    // Validate customer
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    // Validate professional
    const professional = await Professional.findById(professionalId);
    if (!professional) return res.status(404).json({ error: 'Professional not found' });

    // Check if the authenticated user is the same as the customer
    if (req.user.userId !== customerId) {
      return res.status(403).json({ error: 'Unauthorized to book for this customer' });
    }

    // Simplified conflict checking - only check for exact same time slot
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
    const conflictingBooking = await Booking.findOne({
      professional: professionalId,
      date: startOfDay,
      time: time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (conflictingBooking) {
      return res.status(409).json({ 
        error: 'Professional is not available at this time. Please choose a different time slot.' 
      });
    }

    // Calculate total amount based on hourly rate
    const totalAmount = professional.hourlyRate;

    // Create booking with 'pending' status (waiting for professional approval)
    const booking = new Booking({ 
      customer: customerId, 
      professional: professionalId, 
      date: startOfDay, 
      time, 
      service,
      notes,
      customerAddress,
      totalAmount,
      status: 'pending'
    });
    await booking.save();

    // Populate the booking with customer and professional details for response
    const populatedBooking = await Booking.findById(booking._id)
      .populate('customer', 'name email phone')
      .populate('professional', 'name email phone service hourlyRate location');

    res.status(201).json({ 
      message: 'Booking request sent successfully! The professional will review and respond soon.',
      booking: populatedBooking
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get customer's bookings
export const getBookings = async (req, res) => {
  try {
    const { id: customerId } = req.params;
    
    // Check if the authenticated user is the same as the customer
    if (req.user.userId !== customerId) {
      return res.status(403).json({ error: 'Unauthorized to view these bookings' });
    }
    
    // Validate customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    
    // Get all bookings for this customer with professional details
    const bookings = await Booking.find({ customer: customerId })
      .populate('professional', 'name email phone service hourlyRate location')
      .sort({ createdAt: -1 });
    
    res.json({ 
      customerId, 
      bookings,
      totalBookings: bookings.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
