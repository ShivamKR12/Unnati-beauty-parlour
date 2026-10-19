const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin (update if needed)
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Unnati Beauty Parlour API - Ready 💅' });
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    // Seed data here later
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
  });

// Routes placeholder
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/products', require('./routes/products'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;

