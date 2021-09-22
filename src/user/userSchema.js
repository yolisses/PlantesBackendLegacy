import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true // `email` must be unique
  },
});
