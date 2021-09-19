Object.defineProperty(exports, '__esModule', { value: true });
exports.plantSchema = void 0;
const mongoose = require('mongoose');

exports.plantSchema = new mongoose.Schema({
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

// Um dia...
// part: {
//   type: String,
// },
