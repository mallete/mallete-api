const mongoose = require('mongoose')

// Schema

const taskSchema = new mongoose.Schema({
  activeTrial: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'activeTrials',
    required: true
  },
  record: {
    type: String,
    required: true
  },
  title: {
    type: String,
    minLength: 2,
    maxLength: 100,
    required: true
  },
  assignee: {
    type: String,
  },
  limitDate: {
    type: Date,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

const model = mongoose.model('tasks', taskSchema)

module.exports = model
