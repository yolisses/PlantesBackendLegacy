import mongoose from 'mongoose';

export const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'Point',
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
