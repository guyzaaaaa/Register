const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id: String,
    user_password: String,
    user_email: String,
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);