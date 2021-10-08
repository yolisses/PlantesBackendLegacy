import { Plant } from '../db/entities.js';

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

  if (coordinates) {
    query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates,
        },
        $maxDistance: 400000,
      },
    };
  }

  const resultsPerPage = 30;
  const plants = await Plant
    .find(query)
    .skip(Number(page) * resultsPerPage)
    .limit(resultsPerPage);
  return res.send(plants);
}
