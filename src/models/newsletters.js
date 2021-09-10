const mongoose = require('mongoose')

// Schema

const newsletterSchema = new mongoose.Schema({
  userId: {
    type: 'ObjectId',
    ref: '',
    required: true
  },
  numFile: {
    type: Number,
    min: 0,
    max: 20,
    required: true
  },
  actor: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true
  },
  defendant: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  }

})

const model = mongoose.model('newsletters', newsletterSchema)

module.exports = model
