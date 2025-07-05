import express from 'express';
import bcrypt from 'bcryptjs';
import { Customer, Professional, ProfessionalApplication } from '../models/model.js';

const router = express.Router();

router.post('/customers/register', async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const customer = new Customer({
      name, email, passwordHash, phone, address, userType: 'customer'
    });
    await customer.save();
    res.status(201).json({ message: 'Customer registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Professional Application (Join as Professional)
router.post('/professionals/apply', async (req, res) => {
    
  try {
    const { name, email, phone, service, experience, location, hourlyRate, description } = req.body;
    const application = new ProfessionalApplication({
      name, email, phone, service, experience, location, hourlyRate, description
    });
    await application.save();
    res.status(201).json({ message: 'Application submitted for approval' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Get All Professional Applications
router.get('/admin/professional-applications', async (req, res) => {
  try {
    const applications = await ProfessionalApplication.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Approve Professional Application
router.post('/admin/professional-applications/:id/approve', async (req, res) => {
  try {
    const application = await ProfessionalApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    // Set a default password and hash it
    const defaultPassword = 'changeme123';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    // Create Professional
    const professional = new Professional({
      name: application.name,
      email: application.email,
      phone: application.phone,
      service: application.service,
      experience: application.experience,
      location: application.location,
      hourlyRate: application.hourlyRate,
      description: application.description,
      userType: 'professional',
      passwordHash
    });
    await professional.save();
    application.status = 'approved';
    await application.save();
    res.json({ message: 'Application approved and professional created', defaultPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Reject Professional Application
router.post('/admin/professional-applications/:id/reject', async (req, res) => {
  try {
    const application = await ProfessionalApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    application.status = 'rejected';
    await application.save();
    res.json({ message: 'Application rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (for both customers and professionals)
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Customer.findOne({ email });
    let userType = 'customer';
    if (!user) {
      user = await Professional.findOne({ email });
      userType = 'professional';
    }
    if (!user) return res.status(404).json({ error: 'User not found' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', userType, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all approved professionals
router.get('/professionals', async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.json(professionals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
