const mongoose = require('mongoose')

// Schema

const userSchema = new mongoose.Schema({
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
    enum: ['basico', 'profesional', 'profesionalplus'],
    required: false
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
  },
  paymentHistory:[{}],
  created: {
    type: Date,
    default: Date.now
  }
})


/*

  PATCH /:id

  {
    plan: "",
    vigencyDate: Date.now + 30 hace con moment,
    paymentDay: moment(),
    $push:{
      paymentHistory:  [{paypalPaymentObject}]
    }
  }

*/
const model = mongoose.model('users', userSchema)

module.exports = model
