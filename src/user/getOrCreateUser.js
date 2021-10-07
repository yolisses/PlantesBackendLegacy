import { User } from '../db/entities.js';
import { VisibleError } from '../errors/VisibleError.js';
import { getLocationByIp } from '../geolocation/getLocationByIp.js';

export async function getOrCreateUser({
  ip, email, name, image,
}) {
  const user = await User.findOne({ email });

  if (user) return user;

  const location = await getLocationByIp(ip);
  if (location) {
    const {
      latitude, longitude, city, state_prov: state,
    } = location;

    const newUser = new User({
      name,
      email,
      image,
      location: {
        coordinates: [longitude, latitude],
      },
      locationName: { city, state },
    });
    newUser.id = newUser._id;

    await newUser.save();
    return newUser;
  }
  throw new VisibleError(500, 'Location not found');
}
