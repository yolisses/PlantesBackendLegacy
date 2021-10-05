import { toID } from '../utils/toID.js';
import { User } from '../db/entities.js';
import { checkNotUndefined } from '../utils/checkNotUndefined.js';

export async function getUser(req, res) {
  const { id } = req.params;
  checkNotUndefined({ id });
  const user = await User.findById(toID(id));
  if (!user) {
    return res.status(400).send({ error: 'User not found' });
  }
  return res.send(user);
}
