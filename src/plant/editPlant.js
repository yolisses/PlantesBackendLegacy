import { Plant } from '../db/entities.js';
import { toID } from '../utils/toID.js';

export async function editPlant(req, res) {
  const { id } = req.params;
  const { userId } = req;
  const {
    name, description, price, swap, donate, amount, tags,
  } = req.body;

  const updateObj = {};
  if (name) {
    if (name.length < 3) {
      return res.status(401).send({ error: 'Name with less than 3 characters' });
    }
    updateObj.name = name;
  }

  if (description || description === null) {
    updateObj.description = description;
  }

  if (price !== undefined) {
    updateObj.price = price;
  }

  if (swap !== undefined && swap !== null) {
    updateObj.swap = swap;
  }

  if (donate !== undefined && donate !== null) {
    updateObj.donate = donate;
  }

  if (amount || amount === null) {
    updateObj.amount = amount;
  }

  if (tags) {
    updateObj.tags = tags;
  }

  const newPlant = await Plant.findOneAndUpdate(
    { _id: toID(id), userId: toID(userId) },
    updateObj, { new: true },
  ).exec();

  if (!newPlant) {
    return res.status(404).send({ error: 'Plant not found' });
  }

  return res.send(newPlant);
}
