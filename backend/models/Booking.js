const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // '10:00 AM'
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

