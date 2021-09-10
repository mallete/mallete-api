const mongoose = require('mongoose')

// Schema

const userSchema = new mongoose.Schema({
  userId: {
    type: 'ObjectId',
    ref: ''
  },
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    match: /.+@.*\..*/
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  plan: {
    type: String,
    enum: ['Prueba', 'Standard', 'Gold'],
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  },
  rol: {
    type: Number,
    min: 1,
    required: false
  },
  vigencyDate: {
    type: Date,
    required: false
  },
  paymentDay: {
    type: Date,
    required: false
  }

})

const model = mongoose.model('users', userSchema)

module.exports = model
