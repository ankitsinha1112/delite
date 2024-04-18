const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    otp_verified: {
        type: Boolean,
        default: false // Initially set to false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;
