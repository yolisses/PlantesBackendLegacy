import { Chat, Message, Users } from '../db/entities.js';
import { checkNotNull } from '../utils/checkNotNull.js';
import { toID } from '../utils/toID.js';

export const ChatController = {
  async sendPrivateMessage(req, res) {
    const { text, toUserId } = req.body;
    const { userId: fromUserId } = req;

    const fromUser = toID(fromUserId);
    const toUser = toID(toUserId);

    checkNotNull({ text, toUserId });
    const user = await Users.findById(toUser);
    if (!user) { res.status(404).send({ error: 'User not found' }); }

    let chat = await Chat.findOne({ users: { $in: [[fromUser, toUser], [toUser, fromUser]] } });
    if (!chat) {
      chat = await Chat.create({ users: [fromUser, toUser], creator: fromUser, private: true });
    }

    const newMessage = Message({ text, userId: fromUserId, chatId: chat.id });
    await newMessage.save();

    return res.send(newMessage);
  },
};
