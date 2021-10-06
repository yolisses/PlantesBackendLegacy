import { User } from '../db/entities.js';
import { getLocationByIp } from './getLocationByIp.js';

export async function updateUserLocationByIp(req, res) {
  const { userId } = req;
  const location = await getLocationByIp(req.ip);
  if (location) {
    delete location.ip;
    const user = await User.findByIdAndUpdate(userId, { location }, { new: true }).exec();
    res.send(user);
  }
}
