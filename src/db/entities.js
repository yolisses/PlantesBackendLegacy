import './dbConnector.js';
import mongoose from 'mongoose';

import { ChatSchema } from '../chat/ChatSchema.js';
import { UserSchema } from '../user/UserSchema.js';
import { PlantSchema } from '../plant/PlantSchema.js';
import { MessageSchema } from '../chat/MessageSchema.js';

const User = mongoose.model('Users', UserSchema);
const Chat = mongoose.model('Chats', ChatSchema);
const Plant = mongoose.model('Plants', PlantSchema);
const Message = mongoose.model('Messages', MessageSchema);
const SendingPlant = mongoose.model('SendingPlants', PlantSchema);
const RemovedPlant = mongoose.model('RemovedPlants', PlantSchema);

export {
  Plant, User, SendingPlant, Message, Chat, RemovedPlant,
};
