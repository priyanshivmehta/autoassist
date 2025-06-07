const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },    
    role: {
        type: String,
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true
});

// Add passport-local-mongoose plugin

adminSchema.plugin(passportLocalMongoose);
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;