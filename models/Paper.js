const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  examType: {
    type: String,
    enum: ['Mid-Sem', 'End-Sem'],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Paper', paperSchema);
