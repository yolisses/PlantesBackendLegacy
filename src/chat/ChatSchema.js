import { ObjectId } from 'bson';
import mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  users: {
    type: Array,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
  },
  creator: {
    type: ObjectId,
    required: true,
  },
});
