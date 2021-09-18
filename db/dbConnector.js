const mongoose = require('mongoose');
const { environment } = require('../config/config');
const { friendSchema } = require('./schema/friendSchema.js');
const { seriesSchema } = require('./schema/seriesSchema.js');
const { plantSchema } = require('./schema/plantSchema.js');

const env = process.env.NODE_ENV || 'development';

/**
 * Mongoose Connection
* */

mongoose.connect(environment[env].dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', () => {
  console.error('Error while connecting to DB');
});

const Friends = mongoose.model('Friends', friendSchema);
const Plants = mongoose.model('Plants', plantSchema);
const Series = mongoose.model('Series', seriesSchema);

export { Friends, Series, Plants };
