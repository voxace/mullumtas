const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
