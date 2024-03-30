const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    contact_type: String,
    name: String, 
    email: String,
    phone: String ,
    details : String ,
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false });

module.exports = mongoose.model('Contact', ContactSchema);