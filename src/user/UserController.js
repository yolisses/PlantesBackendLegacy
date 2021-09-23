import { Users } from '../db/entities.js';
import { checkNotNull } from '../utils/checkNotNull.js';
import { toID } from '../utils/toID.js';

export const UserController = {
  async getUser(req, res) {
    const { id } = req.params;
    checkNotNull({ id });
    const user = await Users.findById(toID(id));
    return res.send(user);
  },
};
