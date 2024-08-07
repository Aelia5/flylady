const mongoose = require('mongoose');
const { zoneSchema } = require('./zone');

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальное число символов: 2'],
    maxlength: [30, 'Максимальное число символов: 30'],
  },
  zones: [zoneSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('house', houseSchema);
