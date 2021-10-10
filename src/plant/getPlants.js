import { Plant } from '../db/entities.js';
import { EARTH_RADIUS } from '../utils/earthRadius.js';

const searchKilometersRadius = 1000;

export async function getPlants(req, res) {
  const { page } = req.params;
  const {
    donate, sell, swap, text, tags, coordinates,
  } = req.body;

  let query = { };
  const orQuery = [];

  if (donate || swap || sell) {
    if (donate) { orQuery.push({ donate: true }); }
    if (swap) { orQuery.push({ swap: true }); }
    if (sell) { orQuery.push({ price: { $ne: null } }); }
    query = { $or: orQuery };
  }

  if ((tags && tags.length) || text) {
    let textQuery = '';
    if (text) {
      textQuery += text;
    }
    if (tags) {
      tags.forEach((tag) => { textQuery += ` ${tag}`; });
    }
    query.$text = { $search: textQuery };
  }

  // I really don't know when to change

  // if (coordinates) {
  //   query.location = {
  //     $geoWithin: { $centerSphere: [coordinates, searchKilometersRadius / EARTH_RADIUS] },
  //   };
  // }

  const plants = await Plant.paginate(
    query,
    { page, limit: 30, sort: { createdAt: -1 } },
  );
  return res.send(plants);
}
