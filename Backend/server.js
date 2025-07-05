console.log('--- server.js: Starting server setup ---'); // Diagnostic log

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// IMPORTANT: For local files, always include the .js extension in ES Modules
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

// Debug logs (keep for now to confirm fix)
console.log('authRoutes:', authRoutes);
console.log('patientRoutes:', patientRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser and useUnifiedTopology are deprecated in Mongoose 6.x and later
    // You can remove them if you are using a recent version of Mongoose (e.g., 6.x or 7.x)
    // If you are on an older version, keep them.
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected 🎉'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('LONGANI API is running 🚑');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
