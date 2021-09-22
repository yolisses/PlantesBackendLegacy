import './dbConnector.js';
import mongoose from 'mongoose';

import { userSchema } from '../user/userSchema.js';
import { PlantSchema } from '../plant/PlantSchema.js';

const Plants = mongoose.model('Plants', PlantSchema);
const Users = mongoose.model('Users', userSchema);

export { Plants, Users };
