const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  short: { type: String, required: true },
  grade: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
