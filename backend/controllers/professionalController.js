import { Professional, Booking } from '../models/model.js';

// Get professional's bookings
export const getBookings = async (req, res) => {
  try {
    const { id: professionalId } = req.params;
    
    // Check if the authenticated user is the same as the professional
    if (req.user.userId !== professionalId) {
      return res.status(403).json({ error: 'Unauthorized to view these bookings' });
    }
    
    // Validate professional exists
    const professional = await Professional.findById(professionalId);
    if (!professional) return res.status(404).json({ error: 'Professional not found' });
    
    // Get all bookings for this professional with customer details
    const bookings = await Booking.find({ professional: professionalId })
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });
    
    res.json({ 
      professionalId, 
      bookings,
      totalBookings: bookings.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get pending bookings for professional
export const getPendingBookings = async (req, res) => {
  try {
    const { id: professionalId } = req.params;
    
    // Check if the authenticated user is the same as the professional
    if (req.user.userId !== professionalId) {
      return res.status(403).json({ error: 'Unauthorized to view these bookings' });
    }
    
    // Validate professional exists
    const professional = await Professional.findById(professionalId);
    if (!professional) return res.status(404).json({ error: 'Professional not found' });
    
    // Get all pending bookings for this professional
    const pendingBookings = await Booking.find({ 
      professional: professionalId,
      status: 'pending'
    })
      .populate('customer', 'name email phone address')
      .sort({ createdAt: -1 });
    
    res.json({ 
      professionalId, 
      pendingBookings,
      totalPending: pendingBookings.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept booking request
export const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const professionalId = req.user.userId;

    const booking = await Booking.findById(bookingId)
      .populate('customer', 'name email phone')
      .populate('professional', 'name email phone service');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Verify the professional is the one accepting
    if (booking.professional._id.toString() !== professionalId) {
      return res.status(403).json({ error: 'Unauthorized to accept this booking' });
    }

    // Check if booking is still pending
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Booking is no longer pending' });
    }

    // Double-check availability (in case another booking was confirmed)
    const conflictingBooking = await Booking.findOne({
      professional: professionalId,
      date: booking.date,
      time: booking.time,
      status: 'confirmed',
      _id: { $ne: bookingId }
    });

    if (conflictingBooking) {
      return res.status(409).json({ 
        error: 'Time slot is no longer available. Another booking was confirmed.' 
      });
    }

    booking.status = 'confirmed';
    booking.updatedAt = new Date();
    await booking.save();

    res.json({ 
      message: 'Booking accepted successfully!',
      booking: booking
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject booking request
export const rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rejectionReason } = req.body;
    const professionalId = req.user.userId;

    const booking = await Booking.findById(bookingId)
      .populate('customer', 'name email phone')
      .populate('professional', 'name email phone service');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    // Verify the professional is the one rejecting
    if (booking.professional._id.toString() !== professionalId) {
      return res.status(403).json({ error: 'Unauthorized to reject this booking' });
    }

    // Check if booking is still pending
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Booking is no longer pending' });
    }

    booking.status = 'cancelled';
    booking.rejectionReason = rejectionReason;
    booking.updatedAt = new Date();
    await booking.save();

    res.json({ 
      message: 'Booking rejected.',
      booking: booking
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get professional profile
export const getProfile = async (req, res) => {
  try {
    const { id: professionalId } = req.params;
    
    // Check if the authenticated user is the same as the professional
    if (req.user.userId !== professionalId) {
      return res.status(403).json({ error: 'Unauthorized to view this profile' });
    }
    
    const professional = await Professional.findById(professionalId).select('-passwordHash');
    if (!professional) return res.status(404).json({ error: 'Professional not found' });
    
    res.json(professional);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
