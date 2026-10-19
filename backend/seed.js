const mongoose = require('mongoose');
const Service = require('./models/Service');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Seeding data...');

    // Clear existing
    await Service.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Sample users
    const hashedAdminPass = await bcrypt.hash('admin123', 12);
    const hashedCustomerPass = await bcrypt.hash('customer123', 12);
    await User.insertMany([
      { name: 'Admin User', email: 'admin@unnati.com', phone: '1234567890', password: hashedAdminPass, role: 'admin' },
      { name: 'John Doe', email: 'customer@example.com', phone: '9876543210', password: hashedCustomerPass, role: 'customer' }
    ]);

    // Sample services
    await Service.insertMany([
      { name: 'Hair Cut', description: 'Professional haircut for all styles.', price: 500, duration: 45 },
      { name: 'Bridal Makeup', description: 'Complete bridal makeup artist services.', price: 5000, duration: 120 },
      { name: 'Facial', description: 'Deep cleansing and hydrating facial.', price: 1200, duration: 60 },
      { name: 'Nail Art', description: 'Creative nail designs and manicure.', price: 800, duration: 45 },
      { name: 'Hair Spa', description: 'Luxury hair spa treatment.', price: 1500, duration: 90 }
    ]);

    // Sample products
    await Product.insertMany([
      { name: 'Lipstick - Rose', description: 'Long lasting matte lipstick.', price: 450, stock: 20 },
      { name: 'Face Cream', description: 'Hydrating night cream with vitamin C.', price: 899, stock: 15 },
      { name: 'Nail Polish', description: 'Premium gel nail polish.', price: 299, stock: 30 }
    ]);

    console.log('✅ Seed complete!');
    process.exit();
  })
  .catch(err => console.error(err));

