// server.js

console.log('--- server.js: Starting server setup ---'); // Diagnostic log

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.js'; // ✅ This is already ESModule style
import patientRoutes from './Routes/patientRoutes.js';
console.log('--- server.js: Importing routes ---'); 
// Diagnostic log
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/patients', patientRoutes); // 🔐 Protect all patient routes

app.use('/api/auth', authRoutes);
console.log('--- server.js: Auth routes are set up! ---'); // Diagnostic log

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected 🎉'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('LONGANI HOSPITAL  is running 🚑');
});


console.log('--- server.js: Routes are set up! ---'); // Diagnostic log

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
