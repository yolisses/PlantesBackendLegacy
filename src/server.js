import '../config/env.js';
import 'express-async-errors';
import { createServer } from 'http';
import express, { json } from 'express';

import { routes } from './routes.js';
import { errorsMiddleware } from './errors/errorsMiddleware.js';
import { configureIO } from './io.js';
import { notificateMessage } from './notification/notificateMessage.js';

const app = express();

app.use(json());

app.use(routes);

app.use(errorsMiddleware);

app.get('/', async (req, res) => {
  await notificateMessage();
  return res.send();
});

const httpServer = createServer(app);
configureIO(httpServer);

const port = process.env.PORT;
httpServer.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
