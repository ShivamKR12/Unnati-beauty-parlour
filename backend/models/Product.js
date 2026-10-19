const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1625772299842-786951f49d1f?w=400' },
  stock: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

