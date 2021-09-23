import './dbConnector.js';
import mongoose from 'mongoose';

import { PlantSchema } from '../plant/PlantSchema.js';
import { UserSchema } from '../user/UserSchema.js';
import { MessageSchema } from '../chat/MessageSchema.js';
import { ChatSchema } from '../chat/ChatSchema.js';

const SendingPlants = mongoose.model('SendingPlants', PlantSchema);
const Plants = mongoose.model('Plants', PlantSchema);
const Users = mongoose.model('Users', UserSchema);
const Message = mongoose.model('Messages', MessageSchema);
const Chat = mongoose.model('Chats', ChatSchema);

export {
  Plants, Users, SendingPlants, Message, Chat,
};
