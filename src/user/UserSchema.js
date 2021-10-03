import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true, // `email` must be unique
    select: false,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  cep: {
    type: String,
  },
  location: {
    type: Object,
  },
}, {
  timestamps: true,
});
