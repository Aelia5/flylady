const mongoose = require('mongoose');
const { dateTransform } = require('../utils/date');
console.log(dateTransform());

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальное число символов: 2'],
    maxlength: [300, 'Максимальное число символов: 300'],
  },
  frequency: {
    type: Number,
    required: true,
  },
  last: {
    type: Date,
    default: dateTransform(),
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = mongoose.model('task', taskSchema);
