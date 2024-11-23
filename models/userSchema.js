const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "/uploads/default.jpg"
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    dob:{
        type: String,
        required: true,
        // trim: true
    },
    password: {
        type: String,
        required: true,
    }
    
});

const User = new mongoose.model("User", userSchema);
module.exports = User;