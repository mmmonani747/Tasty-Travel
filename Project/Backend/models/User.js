const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phon_no: { type: String, required: true },
  date: { type: Date, default: Date.now } // Optional field to store the registration date
});

// Create and export the Mongoose model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
