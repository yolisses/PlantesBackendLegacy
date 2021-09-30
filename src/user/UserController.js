import { Plant, User } from '../db/entities.js';
import { checkNotNull } from '../utils/checkNotNull.js';
import { toID } from '../utils/toID.js';

export const UserController = {
  async getUser(req, res) {
    const { id } = req.params;
    checkNotNull({ id });
    const user = await User.findById(toID(id));
    if (!user) {
      return res.status(400).send({ error: 'User not found' });
    }
    return res.send(user);
  },

  async getUserPlants(req, res) {
    const { id } = req.params;
    checkNotNull({ id });
    const user = await Plant.find({ userId: toID(id) }).sort({ createdAt: -1 }).exec();
    return res.send(user);
  },

};
