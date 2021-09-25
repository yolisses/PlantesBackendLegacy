import { ObjectId } from 'bson';
import mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  chatId: {
    type: ObjectId,
    required: true,
  },
}, {
  timestamps: true,
});
