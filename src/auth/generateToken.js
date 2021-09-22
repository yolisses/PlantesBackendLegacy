import jwt from 'jsonwebtoken';

export function generateToken(params = {}) {
  const secret = process.env.AUTH_SECRET;
  const oneWeek = 60 * 60 * 24 * 7;
  return jwt.sign(params, secret, {
    expiresIn: oneWeek,
  });
}
