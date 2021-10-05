import { Plant, SendingPlant } from '../db/entities.js';
import { VisibleError } from '../errors/VisibleError.js';
import { createCard } from '../upload/createCard.js';
import { checkNotUndefined } from '../utils/checkNotUndefined.js';
import { getFileNameWithDiferentExtension } from '../utils/getFilenameWithDiferentExtension.js';
import { toID } from '../utils/toID.js';

export async function confirmPlantSending(req, res) {
  const { plantId } = req.body;
  checkNotUndefined({ plantId });

  const sendingPlant = await SendingPlant.findById(toID(plantId));
  if (sendingPlant === null) {
    throw new VisibleError(404, 'Sending plant not found');
  }
  const copy = { ...sendingPlant._doc };
  delete copy.__v;

  copy.card = process.env.S3_CARD_IMAGES_PATH
    + getFileNameWithDiferentExtension(copy.images[0], 'webp');

  copy.images = copy.images.map(
    (key) => process.env.S3_COMPRESSED_IMAGES_PATH
                + getFileNameWithDiferentExtension(key, 'webp'),
  );

  await createCard(`uploads/${sendingPlant.images[0]}`);
  await Plant.create(copy);
  return res.status(200).send(copy);
}
