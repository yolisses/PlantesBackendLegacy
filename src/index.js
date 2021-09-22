import '../config/env.js';
import express, { json } from 'express';
import { routes } from './routes.js';

const app = express();
app.use(json())

app.use(routes)

const port = process.env.PORT;
app.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
