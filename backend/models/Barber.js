const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialties: [String],
  availability: [
    {
      day: String,
      slots: [String],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Barber', barberSchema);
