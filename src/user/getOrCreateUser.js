import { Users } from '../db/entities.js';

export async function getOrCreateUser({ email, name, image }) {
  const user = await Users.findOne({ email });
  if (user) return user;
  const newUser = new Users({ name, email, image });
  console.error({ newUser });
  newUser.id = newUser._id;

  await newUser.save();
  return newUser;
}
