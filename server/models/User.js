const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    email: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
