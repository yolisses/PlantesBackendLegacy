import { toID } from '../utils/toID.js';
import { Plant, RemovedPlant } from '../db/entities.js';
import { VisibleError } from '../errors/VisibleError.js';
import { checkNotUndefined } from '../utils/checkNotUndefined.js';

export async function removePlant(req, res) {
  const { id } = req.params;
  checkNotUndefined({ id });

  console.error(id);

  const plant = await Plant.findById(toID(id));
  if (plant === null) {
    throw new VisibleError(404, 'Sending plant not found');
  }
  const copy = { ...plant._doc };
  delete copy.__v;

  await RemovedPlant.create(copy);
  await plant.remove();
  return res.status(200).send({ success: true });
}
