const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Date, default: Date.now },
  thumbnail: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
