import { connect, connection } from 'mongoose';

const dbString = process.env.DB_STRING;

connect(dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.on('error', () => {
  console.error('Error while connecting to DB');
});
