import './dbConnector.js';
import mongoose from 'mongoose';

import { plantSchema } from '../plant/plantSchema.js';
import { userSchema } from '../user/userSchema.js';

const Plants = mongoose.model('Plants', plantSchema);
const Users = mongoose.model('Users', userSchema);

export { Plants ,Users};
