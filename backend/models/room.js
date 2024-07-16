const mongoose = require('mongoose');

const roomSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальное число символов: 2'],
    maxlength: [30, 'Максимальное число символов: 30']
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'task',
    required: true
  }],

})


module.exports = mongoose.model('room', roomSchema);
