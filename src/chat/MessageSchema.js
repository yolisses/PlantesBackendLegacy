import { ObjectId } from 'bson';
import mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  from: {
    type: ObjectId,
    required: true,
  },
  to: {
    type: ObjectId,
    required: true,
  },
});
