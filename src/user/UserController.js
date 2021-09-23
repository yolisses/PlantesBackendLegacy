import { ObjectId } from 'bson';
import { Users } from '../db/entities.js';
import { checkNotNull } from '../utils/checkNotNull.js';

export const UserController = {
  async getUser(req, res) {
    const { id } = req.params;
    checkNotNull({ id });
    const user = await Users.findById(ObjectId(id));
    return res.send(user);
  },
};
