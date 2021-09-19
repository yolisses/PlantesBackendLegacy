import mongoose from 'mongoose';

const dbString = process.env.DB_STRING;

mongoose.connect(dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', () => {
  console.error('Error while connecting to DB');
});
