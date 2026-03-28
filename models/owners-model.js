const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullName: {
    type: String,
    required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        default: []
    },
    contact : Number,
    picture : String
});

module.exports = mongoose.model('owner', ownerSchema);