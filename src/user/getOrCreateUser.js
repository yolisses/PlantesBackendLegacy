import { Users } from '../db/entities.js';

export async function getOrCreateUser({ email, name }) {
  const user = await Users.findOne({ email });
  if (user) return user;

  const newUser = new Users({ name, email });
  console.error({ newUser });
  newUser.id = newUser._id;

  await newUser.save();
  return newUser;
}
