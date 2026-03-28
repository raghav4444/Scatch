const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: {
        type: String,
        default: 'white'
    },
    pannelcolor: {
        type: String,
        default: 'white'
    },
    textcolor: {
        type: String,
        default: 'black'
    }
});

module.exports = mongoose.model('product', productSchema);