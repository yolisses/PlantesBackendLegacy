import { Plant } from '../db/entities.js';
import { toID } from '../utils/toID.js';

export async function getPlant(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: 'No id provided' });
  try {
    const plant = await Plant.findById(toID(id));
    return res.send(plant);
  } catch (err) {
    return res.status(401).send(err);
  }
}
