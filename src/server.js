import '../config/env.js';
import 'express-async-errors';
import { createServer } from 'http';
import express, { json } from 'express';

import { routes } from './routes.js';
import { errorsMiddleware } from './errors/errorsMiddleware.js';
import { configureIO } from './io.js';
import { notifyMessage } from './notification/notifyMessage.js';

const app = express();

app.use(json());

app.use(routes);

app.use(errorsMiddleware);

app.get('/', async (req, res) => {
  await notifyMessage('614db39533ab029270c1812a');
  return res.send();
});

const httpServer = createServer(app);
configureIO(httpServer);

const port = process.env.PORT;
httpServer.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
