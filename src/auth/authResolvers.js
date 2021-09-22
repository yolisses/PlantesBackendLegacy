import { OAuth2Client } from 'google-auth-library';
import { getOrCreateUser } from '../user/getOrCreateUser.js';
import { checkNotNull } from '../utils/checkNotNull.js';
import { generateToken } from './generateToken.js';

const client = new OAuth2Client();

export const AuthController = {
  async authenticateWithGoogle(req, res) {
    const { idToken } = req.body;
    checkNotNull(res, { idToken });
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { name, email } = payload;

      const user = await getOrCreateUser({ name, email });

      const token = generateToken({ id: user.id });
      return res.send({ token });
    } catch (err) {
      return res.status(400).send({ error: `${err}` });
    }
  },
};
