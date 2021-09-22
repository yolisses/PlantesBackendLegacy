import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const secret = process.env.AUTH_SECRET;

  const authHeader = req.headers.auth;
  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Token with invalid number of segments' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Malformatted token' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: err });
    }

    req.user_id = decoded.id;
    return next();
  });
}
