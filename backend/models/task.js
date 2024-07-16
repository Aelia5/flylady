const mongoose = require('mongoose');

const taskSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальное число символов: 2'],
    maxlength: [300, 'Максимальное число символов: 300']
  },
  frequency: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

})

module.exports = mongoose.model('task', taskSchema);
