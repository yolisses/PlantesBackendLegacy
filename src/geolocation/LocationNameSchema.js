import mongoose from 'mongoose';

export const locationNameSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
});
