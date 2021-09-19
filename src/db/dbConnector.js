import { connect, connection } from 'mongoose';
import { environment } from '../../config/config';

const env = process.env.NODE_ENV || 'development';

connect(environment[env].dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('error', () => {
  console.error('Error while connecting to DB');
});
