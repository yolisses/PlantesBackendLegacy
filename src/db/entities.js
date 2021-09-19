import './dbConnector.js';
import { model } from 'mongoose';

import { plantSchema } from '../plant/plantSchema.js';

const Plants = model('Plants', plantSchema);

export { Plants };
