import mongoose from 'mongoose';

export const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
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
    type: [String],
  },
}, {
  timestamps: true,
});

PlantSchema.index({
  name: 'text',
  tags: 'text',
  description: 'text',
});
