import { User } from '../db/entities.js';

export async function updateProfile(req, res) {
  const { userId } = req;
  const {
    name, description, whatsappNumber, instagramUser,
  } = req.body;

  if (!name && !description) {
    return res.status(400).send({ error: 'Missing update values' });
  }

  const updateObj = {};
  if (name) {
    if (name.length < 3) {
      return res.status(401).send({ error: 'Name with less than 3 characters' });
    }
    updateObj.name = name;
  }

  if (description || description === null) {
    updateObj.description = description;
  }

  if (whatsappNumber) {
    updateObj.whatsappNumber = whatsappNumber;
  }

  if (whatsappNumber === null || whatsappNumber === '') {
    updateObj.whatsappNumber = null;
  }

  if (instagramUser) {
    updateObj.instagramUser = instagramUser;
  }

  if (instagramUser === null || instagramUser === '') {
    updateObj.instagramUser = null;
  }

  const newUser = await User.findByIdAndUpdate(userId, updateObj, { new: true }).exec();

  return res.send(newUser);
}
