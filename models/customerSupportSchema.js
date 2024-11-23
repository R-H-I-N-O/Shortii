const mongoose = require('mongoose');

const customerSupportSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    mobile:{
        type: Number,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
});

const CustomerSupport = mongoose.model("CustomerSupport", customerSupportSchema);

module.exports = CustomerSupport;