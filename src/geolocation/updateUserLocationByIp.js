import { User } from '../db/entities.js';
import { getLocationByIp } from './getLocationByIp.js';

export async function updateUserLocationByIp(req, res) {
  const { userId } = req;
  const location = await getLocationByIp(req.ip);
  if (location) {
    const {
      latitude, longitude, city, state_prov: state,
    } = location;
    const user = await User.findByIdAndUpdate(userId, {
      location: {
        coordinates: [longitude, latitude],
      },
      locationName: { city, state },
    },
    { new: true }).exec();
    res.send(user);
  }
}
