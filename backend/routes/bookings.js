const express = require('express');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const { auth, adminAuth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// GET user's bookings (customer) or all (admin)
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const bookings = await Booking.find(query)
      .populate('userId', 'name email')
      .populate('serviceId', 'name price')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST booking (customer)
router.post('/', [auth, [
  body('serviceId').notEmpty(),
  body('date').isISO8601(),
  body('time').matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/),
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { serviceId, date, time, notes } = req.body;
    req.body.userId = req.user.id;

    // Check service exists
    const service = await Service.findById(serviceId);
    if (!service) return res.status(400).json({ msg: 'Service not found' });

    const booking = new Booking(req.body);
    await booking.save();
    await booking.populate('serviceId', 'name price');
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT update booking status (admin) or customer own
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    // Customer can only update own
    if (req.user.role !== 'admin' && booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('userId', 'name email')
      .populate('serviceId', 'name price');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE (admin or owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });

    if (req.user.role !== 'admin' && booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

