import mongoose from 'mongoose';
import { locationNameSchema } from '../geolocation/LocationNameSchema.js';
import { pointSchema } from '../geolocation/PointSchema.js';

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
    type: pointSchema,
    required: true,
  },
  locationName: {
    type: locationNameSchema,
  },
}, {
  timestamps: true,
});
