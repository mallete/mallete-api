const mongoose = require('mongoose')

// Schema

const taskSchema = new mongoose.Schema({
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
  title: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true
  },
  limitDate: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  }

})

const model = mongoose.model('tasks', taskSchema)

module.exports = model
