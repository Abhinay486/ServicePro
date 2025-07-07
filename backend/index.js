import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import organized routes
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import generalRoutes from './routes/generalRoutes.js';
import legacyRoutes from './routes/legacyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('ServicePro backend is running!');
});

// Organized API routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', generalRoutes);

// Legacy routes for backward compatibility
app.use('/api', legacyRoutes);

// Error handling middleware

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
