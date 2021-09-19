import './dbConnector.js';
import mongoose from 'mongoose';

import { plantSchema } from '../plant/plantSchema.js';

const Plants = mongoose.model('Plants', plantSchema);

export { Plants };
