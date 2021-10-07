import { OAuth2Client } from 'google-auth-library';

import { generateToken } from './generateToken.js';
import { getOrCreateUser } from '../user/getOrCreateUser.js';
import { checkNotUndefined } from '../utils/checkNotUndefined.js';
import { createNotificationAuthToken } from '../notification/createNotificationAuthToken.js';

const client = new OAuth2Client();

export async function authenticateWithGoogle(req, res) {
  const { idToken } = req.body;
  const { ip } = req;
  checkNotUndefined({ idToken });
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    const user = await getOrCreateUser({
      ip, name, email, image: picture,
    });
    const { id } = user;
    const token = generateToken({ id });

    const idAuthToken = createNotificationAuthToken(id);
    const emailAuthToken = createNotificationAuthToken(email);

    return res.send({
      id, token, user, email, idAuthToken, emailAuthToken,
    });
  } catch (err) {
    return res.status(400).send({ error: `${err}` });
  }
}
