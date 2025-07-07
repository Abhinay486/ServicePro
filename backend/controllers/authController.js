import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Customer, Professional, ProfessionalApplication } from '../models/model.js';

// Register customer
export const register = async (req, res) => {
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
};

// Login for both customers and professionals
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Professional.findOne({ email });
    let userType;
    
    if (user) {
      userType = user.userType || 'professional';
    } else {
      user = await Customer.findOne({ email });
      if (user) {
        userType = user.userType || 'customer';
      }
    }
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      message: 'Login successful', 
      userType, 
      userId: user._id,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Apply to become a professional
export const applyProfessional = async (req, res) => {
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
};
