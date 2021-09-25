import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

const secret = process.env.AUTH_SECRET;

export let io;

function getId(token) {
  return new Promise(
    (resolve, reject) => jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded.id);
    }),
  );
}

export function configureIO(httpServer) {
  io = new Server(httpServer, { });

  io.use(async (socket, next) => {
    try {
      const id = await getId(socket.handshake.auth.token);
      socket.join(id);
      console.error('hello', id);
      next();
    } catch (err) {
      next(new Error('invalid'));
    }
  });
}
