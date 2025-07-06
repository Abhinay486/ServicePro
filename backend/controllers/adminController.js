import bcrypt from 'bcryptjs';
import { Professional, ProfessionalApplication } from '../models/model.js';

// Get all pending professional applications
export const getPendingApplications = async (req, res) => {
  try {
    const applications = await ProfessionalApplication.find({ status: 'pending' });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all professional applications (all statuses)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await ProfessionalApplication.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve professional application
export const approveProfessional = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await ProfessionalApplication.findById(id);
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
    
    res.json({ 
      message: 'Application approved and professional created', 
      defaultPassword,
      professional: {
        id: professional._id,
        name: professional.name,
        email: professional.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject professional application
export const rejectProfessional = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await ProfessionalApplication.findById(id);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    
    application.status = 'rejected';
    await application.save();
    
    res.json({ message: 'Application rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
