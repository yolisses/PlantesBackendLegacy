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

  async sendMessage(req, res) {
    const { text, chatId } = req.body;
    const { userId } = req;
    checkNotNull({ text, chatId });

    const chat = await Chat // return a single item array
      .findById(toID(chatId))
      .find({ users: toID(userId) });

    if (chat.length === 0) {
      return res.status(404).send({ error: 'Chat not found' });
    }

    const newMessage = Message({ text, userId, chatId });
    await newMessage.save();

    return res.send(newMessage);
  },

  async getUserChats(req, res) {
    const { userId } = req;
    const chats = await Chat.find({ users: toID(userId) });
    res.send(chats);
  },

  async getChatMessages(req, res) {
    const { id } = req.params;
    const { userId } = req;
    checkNotNull({ id });
    const chat = await Chat // return a single item array
      .findById(toID(id))
      .find({ users: toID(userId) });

    if (chat.length === 0) {
      return res.status(404).send({ error: 'Chat not found' });
    }

    const messages = await Message.find({ chatId: id });
    return res.send(messages);
  },
};
