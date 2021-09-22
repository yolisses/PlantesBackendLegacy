import '../config/env.js';
import express, { json } from 'express';
import 'express-async-errors';
import { routes } from './routes.js';
import { errorsMiddleware } from './errors/errorsMiddleware.js';

const app = express();
app.use(json());

app.use(routes);

app.use(errorsMiddleware);

const port = process.env.PORT;
app.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
