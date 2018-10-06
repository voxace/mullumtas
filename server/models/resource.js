const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
