const mongoose = require('mongoose');

export const friendSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    swap: {
        type: Boolean,
    },
    donate: {
        type: Boolean,
    },
    images: {
        type: Array,
    },
    card: {
        type: String,
    },
    amount: {
        type: Number,
    },
    tags: {
        type: Array,
    },
});

// part: {
//     type: String,
// },