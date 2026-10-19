const express = require('express');
const Service = require('../models/Service');
const { auth, adminAuth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// GET all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST service (admin)
router.post('/', [auth, adminAuth, [
  body('name').notEmpty(),
  body('description').notEmpty(),
  body('price').isNumeric()
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// PUT update (admin)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ msg: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE (admin)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });
    res.json({ msg: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

