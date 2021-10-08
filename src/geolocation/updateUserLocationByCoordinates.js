import { Plant, User } from '../db/entities.js';
import { checkNotUndefined } from '../utils/checkNotUndefined.js';
import { getLocationByCoordinates } from './getLocationByCoordinates.js';

export async function updateUserLocationByCoordinates(req, res) {
  const { latitude, longitude } = req.body;
  checkNotUndefined({ latitude, longitude });
  const { userId } = req;

  const response = await getLocationByCoordinates({ latitude, longitude });
  const {
    city, town, village, city_district, state,
  } = response;

  const user = await User.findByIdAndUpdate(userId, {
    location: {
      coordinates: [longitude, latitude],
    },
    locationName: { city: city || town || village || city_district, state },
  },
  { new: true }).exec();
  res.send(user);

  await Plant.updateMany({ userId }, {
    location: {
      coordinates: [longitude, latitude],
    },
  }).exec();
}
