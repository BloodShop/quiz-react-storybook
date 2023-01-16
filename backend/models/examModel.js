const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true
  },
  releasedDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [{
    title:{type: String, required: true},
    description:{type: String, required: true},
    answers:[{txt:{type: String, required: true}, selected:{type: Boolean, default: false}}],
    correctAnswer:{type: String, required: true}
  }]
});

 module.exports = mongoose.model('Exam', ExamSchema);