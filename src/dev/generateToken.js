import { generateToken } from '../auth/generateToken.js';
import { User } from '../db/entities.js';

export async function devToken(req, res) {
  const email = 'm.stunik@gmail.com';
  const user = await User.findOne({ email });
  const token = generateToken({ id: user._id });
  res.send({ token });
}
