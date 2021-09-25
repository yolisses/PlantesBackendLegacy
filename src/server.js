import '../config/env.js';
import 'express-async-errors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import express, { json } from 'express';

import { routes } from './routes.js';
import { errorsMiddleware } from './errors/errorsMiddleware.js';
import { socketOnConnect } from './socketOnConnect.js';

const app = express();

app.use(json());

app.use(routes);

app.use(errorsMiddleware);

const httpServer = createServer(app);
const io = new Server(httpServer, { });
io.on('connection', socketOnConnect);

const port = process.env.PORT;
httpServer.listen({ port }, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
