// import express from 'express';
// import bcrypt from 'bcryptjs';
// import { Customer, Professional, ProfessionalApplication, Booking } from '../models/model.js';

// const router = express.Router();

// router.post('/customers/register', async (req, res) => {
//   try {
//     const { name, email, password, phone, address } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     const customer = new Customer({
//       name, email, passwordHash, phone, address, userType: 'customer'
//     });
//     await customer.save();
//     res.status(201).json({ message: 'Customer registered successfully' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Professional Application (Join as Professional)
// router.post('/professionals/apply', async (req, res) => {
    
//   try {
//     const { name, email, phone, service, experience, location, hourlyRate, description } = req.body;
//     const application = new ProfessionalApplication({
//       name, email, phone, service, experience, location, hourlyRate, description
//     });
//     await application.save();
//     res.status(201).json({ message: 'Application submitted for approval' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Admin: Get All Professional Applications
// router.get('/admin/professional-applications', async (req, res) => {
//   try {
//     const applications = await ProfessionalApplication.find();
//     res.json(applications);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Admin: Approve Professional Application
// router.post('/admin/professional-applications/:id/approve', async (req, res) => {
//   try {
//     const application = await ProfessionalApplication.findById(req.params.id);
//     if (!application) return res.status(404).json({ error: 'Application not found' });
//     // Set a default password and hash it
//     const defaultPassword = 'changeme123';
//     const passwordHash = await bcrypt.hash(defaultPassword, 10);
//     // Create Professional
//     const professional = new Professional({
//       name: application.name,
//       email: application.email,
//       phone: application.phone,
//       service: application.service,
//       experience: application.experience,
//       location: application.location,
//       hourlyRate: application.hourlyRate,
//       description: application.description,
//       userType: 'professional',
//       passwordHash
//     });
//     await professional.save();
//     application.status = 'approved';
//     await application.save();
//     res.json({ message: 'Application approved and professional created', defaultPassword });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Admin: Reject Professional Application
// router.post('/admin/professional-applications/:id/reject', async (req, res) => {
//   try {
//     const application = await ProfessionalApplication.findById(req.params.id);
//     if (!application) return res.status(404).json({ error: 'Application not found' });
//     application.status = 'rejected';
//     await application.save();
//     res.json({ message: 'Application rejected' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login (for both customers and professionals)
// router.post('/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     let user = await Customer.findOne({ email });
//     let userType = 'customer';
//     if (!user) {
//       user = await Professional.findOne({ email });
//       userType = 'professional';
//     }
//     if (!user) return res.status(404).json({ error: 'User not found' });
//     const valid = await bcrypt.compare(password, user.passwordHash);
//     if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
//     res.json({ message: 'Login successful', userType, userId: user._id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all approved professionals
// router.get('/professionals', async (req, res) => {
//   try {
//     const professionals = await Professional.find();
//     res.json(professionals);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Create booking for customers
// router.post('/customers/:customerId/bookings', async (req, res) => {
//   try {
//     const { customerId } = req.params;
//     const { professionalId, date, time, service, notes } = req.body;

//     // Validate customer
//     const customer = await Customer.findById(customerId);
//     if (!customer) return res.status(404).json({ error: 'Customer not found' });

//     // Validate professional
//     const professional = await Professional.findById(professionalId);
//     if (!professional) return res.status(404).json({ error: 'Professional not found' });

//     // Calculate total amount based on hourly rate (assuming 1 hour for now)
//     const totalAmount = professional.hourlyRate;

//     // Create booking
//     const booking = new Booking({ 
//       customer: customerId, 
//       professional: professionalId, 
//       date, 
//       time, 
//       service,
//       notes,
//       totalAmount
//     });
//     await booking.save();

//     // Also add booking to professional's bookings array (for backward compatibility)
//     professional.bookings.push({
//       customerId,
//       date,
//       time,
//       status: 'pending'
//     });
//     await professional.save();

//     res.status(201).json({ 
//       message: 'Booking created successfully', 
//       booking: {
//         id: booking._id,
//         customerId, 
//         professionalId, 
//         date, 
//         time, 
//         service,
//         totalAmount,
//         status: booking.status
//       }
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
// // Book a professional (alternative endpoint)
// router.post('/professionals/:professionalId/bookings', async (req, res) => {
//   try {
//     const { professionalId } = req.params;
//     const { customerId, date, time, service, notes } = req.body;

//     // Validate professional
//     const professional = await Professional.findById(professionalId);
//     if (!professional) return res.status(404).json({ error: 'Professional not found' });

//     // Validate customer
//     const customer = await Customer.findById(customerId);
//     if (!customer) return res.status(404).json({ error: 'Customer not found' });

//     // Calculate total amount based on hourly rate
//     const totalAmount = professional.hourlyRate;

//     // Create booking
//     const booking = new Booking({ 
//       customer: customerId, 
//       professional: professionalId, 
//       date, 
//       time, 
//       service,
//       notes,
//       totalAmount
//     });
//     await booking.save();

//     // Also add booking to professional's bookings array
//     professional.bookings.push({
//       customerId,
//       date,
//       time,
//       status: 'pending'
//     });
//     await professional.save();

//     res.status(201).json({ 
//       message: 'Booking created successfully', 
//       booking: {
//         id: booking._id,
//         professionalId, 
//         customerId, 
//         date, 
//         time, 
//         service,
//         totalAmount,
//         status: booking.status
//       }
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get bookings for a professional
// router.get('/professionals/:professionalId/bookings', async (req, res) => {
//   try {
//     const { professionalId } = req.params;
    
//     // Validate professional exists
//     const professional = await Professional.findById(professionalId);
//     if (!professional) return res.status(404).json({ error: 'Professional not found' });
    
//     // Get all bookings for this professional with customer details
//     const bookings = await Booking.find({ professional: professionalId })
//       .populate('customer', 'name email phone')
//       .sort({ createdAt: -1 });
    
//     res.json({ 
//       professionalId, 
//       bookings,
//       totalBookings: bookings.length
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get bookings for a customer
// router.get('/customers/:customerId/bookings', async (req, res) => {
//   try {
//     const { customerId } = req.params;
    
//     // Validate customer exists
//     const customer = await Customer.findById(customerId);
//     if (!customer) return res.status(404).json({ error: 'Customer not found' });
    
//     // Get all bookings for this customer with professional details
//     const bookings = await Booking.find({ customer: customerId })
//       .populate('professional', 'name email phone service hourlyRate location')
//       .sort({ createdAt: -1 });
    
//     res.json({ 
//       customerId, 
//       bookings,
//       totalBookings: bookings.length
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update booking status
// router.patch('/bookings/:bookingId/status', async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { status } = req.body;
    
//     // Validate status
//     const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({ error: 'Invalid status' });
//     }
    
//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ error: 'Booking not found' });
    
//     booking.status = status;
//     booking.updatedAt = new Date();
//     await booking.save();
    
//     res.json({ message: 'Booking status updated successfully', booking });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// //make a booking request to professional
// router.post('/bookings/request', async (req, res) => {
//   try {
//     const { customerId, professionalId, date, time, service, notes, customerAddress } = req.body;

//     // Validate customer
//     const customer = await Customer.findById(customerId);
//     if (!customer) return res.status(404).json({ error: 'Customer not found' });

//     // Validate professional
//     const professional = await Professional.findById(professionalId);
//     if (!professional) return res.status(404).json({ error: 'Professional not found' });

//     // Simplified conflict checking - only check for exact same time slot
//     const targetDate = new Date(date);
//     const startOfDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    
//     const conflictingBooking = await Booking.findOne({
//       professional: professionalId,
//       date: startOfDay,
//       time: time,
//       status: { $in: ['pending', 'confirmed'] }
//     });

//     if (conflictingBooking) {
//       return res.status(409).json({ 
//         error: 'Professional is not available at this time. Please choose a different time slot.' 
//       });
//     }

//     // Calculate total amount based on hourly rate
//     const totalAmount = professional.hourlyRate;

//     // Create booking with 'pending' status (waiting for professional approval)
//     const booking = new Booking({ 
//       customer: customerId, 
//       professional: professionalId, 
//       date: startOfDay, 
//       time, 
//       service,
//       notes,
//       customerAddress,
//       totalAmount,
//       status: 'pending'
//     });
//     await booking.save();

//     // Populate the booking with customer and professional details for response
//     const populatedBooking = await Booking.findById(booking._id)
//       .populate('customer', 'name email phone')
//       .populate('professional', 'name email phone service hourlyRate location');

//     res.status(201).json({ 
//       message: 'Booking request sent successfully! The professional will review and respond soon.',
//       booking: populatedBooking
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Professional accepts a booking request
// router.patch('/bookings/:bookingId/accept', async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { professionalId } = req.body;

//     const booking = await Booking.findById(bookingId)
//       .populate('customer', 'name email phone')
//       .populate('professional', 'name email phone service');

//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     // Verify the professional is the one accepting
//     if (booking.professional._id.toString() !== professionalId) {
//       return res.status(403).json({ error: 'Unauthorized to accept this booking' });
//     }

//     // Check if booking is still pending
//     if (booking.status !== 'pending') {
//       return res.status(400).json({ error: 'Booking is no longer pending' });
//     }

//     // Double-check availability (in case another booking was confirmed)
//     const conflictingBooking = await Booking.findOne({
//       professional: professionalId,
//       date: booking.date,
//       time: booking.time,
//       status: 'confirmed',
//       _id: { $ne: bookingId }
//     });

//     if (conflictingBooking) {
//       return res.status(409).json({ 
//         error: 'Time slot is no longer available. Another booking was confirmed.' 
//       });
//     }

//     booking.status = 'confirmed';
//     booking.updatedAt = new Date();
//     await booking.save();

//     res.json({ 
//       message: 'Booking accepted successfully!',
//       booking: booking
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Professional rejects a booking request
// router.patch('/bookings/:bookingId/reject', async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { professionalId, rejectionReason } = req.body;

//     const booking = await Booking.findById(bookingId)
//       .populate('customer', 'name email phone')
//       .populate('professional', 'name email phone service');

//     if (!booking) return res.status(404).json({ error: 'Booking not found' });

//     // Verify the professional is the one rejecting
//     if (booking.professional._id.toString() !== professionalId) {
//       return res.status(403).json({ error: 'Unauthorized to reject this booking' });
//     }

//     // Check if booking is still pending
//     if (booking.status !== 'pending') {
//       return res.status(400).json({ error: 'Booking is no longer pending' });
//     }

//     booking.status = 'cancelled';
//     booking.rejectionReason = rejectionReason;
//     booking.updatedAt = new Date();
//     await booking.save();

//     res.json({ 
//       message: 'Booking rejected.',
//       booking: booking
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get pending booking requests for a professional
// router.get('/professionals/:professionalId/pending-bookings', async (req, res) => {
//   try {
//     const { professionalId } = req.params;
    
//     // Validate professional exists
//     const professional = await Professional.findById(professionalId);
//     if (!professional) return res.status(404).json({ error: 'Professional not found' });
    
//     // Get all pending bookings for this professional
//     const pendingBookings = await Booking.find({ 
//       professional: professionalId,
//       status: 'pending'
//     })
//       .populate('customer', 'name email phone address')
//       .sort({ createdAt: -1 });
    
//     res.json({ 
//       professionalId, 
//       pendingBookings,
//       totalPending: pendingBookings.length
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Removed availability checking endpoint to simplify booking process

// export default router;
