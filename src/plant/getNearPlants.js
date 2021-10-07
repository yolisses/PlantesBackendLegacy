import { Plant } from '../db/entities.js';

export async function getNearPlants(req, res) {
  const result = await Plant.aggregate(
    [
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [-6, -35],
          },
          distanceField: 'distance',
          spherical: true,
          maxDistance: 10000,
        },
      },
    ],
  );

  return res.send(result);
}
