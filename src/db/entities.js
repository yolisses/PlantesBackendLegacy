import './dbConnector.js';
import mongoose from 'mongoose';

import { PlantSchema } from '../plant/PlantSchema.js';
import { UserSchema } from '../user/UserSchema.js';
import { MessageSchema } from '../chat/MessageSchema.js';
import { ChatSchema } from '../chat/ChatSchema.js';

const SendingPlant = mongoose.model('SendingPlants', PlantSchema);
const RemovedPlant = mongoose.model('RemovedPlants', PlantSchema);
const Plant = mongoose.model('Plants', PlantSchema);
const User = mongoose.model('Users', UserSchema);
const Message = mongoose.model('Messages', MessageSchema);
const Chat = mongoose.model('Chats', ChatSchema);

export {
  Plant, User, SendingPlant, Message, Chat, RemovedPlant,
};
