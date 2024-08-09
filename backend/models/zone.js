const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Минимальное число символов: 3'],
    maxlength: [100, 'Максимальное число символов: 100'],
  },
  tasks: [
    {
      type: String,
      required: true,
      minlength: [3, 'Минимальное число символов: 3'],
      maxlength: [300, 'Максимальное число символов: 300'],
    },
  ],
});

const Zone = mongoose.model('zone', zoneSchema);
module.exports = { Zone, zoneSchema };
