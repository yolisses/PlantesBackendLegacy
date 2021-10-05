import { Plant } from '../db/entities.js';

export async function getAllPlants(req, res) {
  const plants = await Plant.find();
  return res.send(plants);
}
