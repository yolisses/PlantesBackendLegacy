import { Message, Users } from '../db/entities.js';
import { VisibleError } from '../errors/VisibleError.js';
import { checkNotNull } from '../utils/checkNotNull.js';
import { toID } from '../utils/toID.js';

export const ChatController = {
  async sendPrivateMessage(req, res) {
    const { text, userId: toUserId } = req.body;
    const { userId: fromUserId } = req;

    checkNotNull({ text, userId: toUserId });
    const user = await Users.findById(toID(toUserId));
    if (!user) { res.status(404).send({ error: 'User not found' }); }

    const newMessage = Message({ text, from: fromUserId, to: toUserId });
    await newMessage.save();

    return res.send(newMessage);
  },
};
