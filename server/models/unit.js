const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const unitSchema = new Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit;
