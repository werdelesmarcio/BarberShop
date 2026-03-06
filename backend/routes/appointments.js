const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// create appointment
router.post('/', async (req, res) => {
  try {
    const appt = await Appointment.create(req.body);
    res.status(201).json(appt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// list all appointments
router.get('/', async (req, res) => {
  try {
    const appts = await Appointment.find().populate('barber client');
    res.json(appts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
