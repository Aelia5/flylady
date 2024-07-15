const mongoose = require('mongoose');
const {roomSchema} = require('./room');

const houseSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальное число символов: 2'],
    maxlength: [30, 'Максимальное число символов: 30']
  },
  rooms: [roomSchema]
})

const House = mongoose.model('house', houseSchema);
module.exports={House, houseSchema}