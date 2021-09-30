import { User } from '../db/entities.js';

export async function getOrCreateUser({ email, name, image }) {
  const user = await User.findOne({ email });
  if (user) return user;
  const newUser = new User({ name, email, image });
  newUser.id = newUser._id;

  await newUser.save();
  return newUser;
}
