const mongoose = require('mongoose')

// Schema

const notificationSchema = new mongoose.Schema({
  userId: {
    type: 'ObjectId',
    ref: '',
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  title: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true
  },
  descrption: {
    type: String,
    required: true
  },
  limitDate: {
    type: Date,
    required: true
  }

})

const model = mongoose.model('notifications', notificationSchema)

module.exports = model
