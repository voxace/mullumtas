const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  admin: { type: Boolean, required: true },
  detId: { type: String, unique: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
