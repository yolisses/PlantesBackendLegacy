import { toID } from '../utils/toID.js';
import { Plant } from '../db/entities.js';
import { checkNotUndefined } from '../utils/checkNotUndefined.js';

export async function getUserPlants(req, res) {
  const { id } = req.params;
  checkNotUndefined({ id });
  const user = await Plant.find({ userId: toID(id) }).sort({ createdAt: -1 }).exec();
  return res.send(user);
}
