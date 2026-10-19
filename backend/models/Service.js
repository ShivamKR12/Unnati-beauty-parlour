const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1514587386477-f22856ef7067?w=400' },
  duration: { type: Number, default: 60 } // minutes
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);

