const mongoose = require('mongoose');
const User = require('./userSchema');

const urlSchema = new mongoose.Schema({
    shortID : {
        type: String,
        required: true,
        unique: true,
    },
    orginalUrl:{
        type: String,
        required: true,
    },
    visitHistory: [{
        timeStamp: String,
    }],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: User,
    }
}, {timestamps: true});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;