const mongoose = require('mongoose');

const UserinfoSchema = new mongoose.Schema({
    resume: Buffer,
    name: String,
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    marry: {
        type: String,
            enum: ['Single', 'Married', 'Divorced', 'Widowed']
    },
    country: String,
    religion: String,
    birth: Date,
    height: Number,
    weight: Number,
    soldier: {
        type: String,
            enum: ['Yes', 'No', 'Exempt']
    },
    address: String,
    province: String,
    postal_code: String,
    email: String,
    phone: String,
    line_id: String,
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false });


module.exports = mongoose.model('Userinfo', UserinfoSchema);