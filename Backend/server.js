console.log('Server is starting...');

// File: Backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.JS');
const patientRoutes = require('./routes/patientRoutes.JS');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Debug logs BEFORE using the routes
console.log('authRoutes:', authRoutes);
console.log('patientRoutes:', patientRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected 🎉'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('LONGANI API is running 🚑');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});