const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
