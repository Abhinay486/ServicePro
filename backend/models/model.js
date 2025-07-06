import mongoose from 'mongoose';

// User base schema (for both Customer and Professional)
const UserBase = {
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: String, enum: ['customer', 'professional', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

// Customer schema
const CustomerSchema = new mongoose.Schema({
  ...UserBase,
  address: { type: String }
});

// Professional schema
const ProfessionalSchema = new mongoose.Schema({
  ...UserBase,
  service: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  bookings: [{
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'pending' }
  }]
});

// Booking schema
const BookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  service: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  notes: { type: String },
  customerAddress: { type: String, required: true },
  totalAmount: { type: Number },
  rejectionReason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Professional Application schema (for admin approval)
const ProfessionalApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export const Customer = mongoose.model('Customer', CustomerSchema);
export const Professional = mongoose.model('Professional', ProfessionalSchema);
export const ProfessionalApplication = mongoose.model('ProfessionalApplication', ProfessionalApplicationSchema);
export const Booking = mongoose.model('Booking', BookingSchema);