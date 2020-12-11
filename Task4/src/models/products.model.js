const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0.01,
        max: 9.99
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);
