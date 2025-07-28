// db.js
require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

const usePlayground = process.env.USE_PLAYGROUND === 'true';

// Pick the correct connection string
const mongoURI = usePlayground ? process.env.MONGO_URI_PLAYGROUND : process.env.MONGO_URI_MAIN;

console.log(`Connecting to ${usePlayground ? 'playground' : 'main'} database...`);

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(`Connected to ${usePlayground ? 'playground' : 'main'} MongoDB connected successfully`);
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});