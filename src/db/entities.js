import './dbConnector.js';
import mongoose from 'mongoose';

import { PlantSchema } from '../plant/PlantSchema.js';
import { UserSchema } from '../user/UserSchema.js';

const SendingPlants = mongoose.model('SendingPlants', PlantSchema);
const Plants = mongoose.model('Plants', PlantSchema);
const Users = mongoose.model('Users', UserSchema);

export { Plants, Users, SendingPlants };
