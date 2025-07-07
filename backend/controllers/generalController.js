import { Professional } from '../models/model.js';

// Get all approved professionals
export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.json(professionals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
