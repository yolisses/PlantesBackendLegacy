import { checkNotUndefined } from '../utils/checkNotUndefined.js';
import { SendingPlant, User } from '../db/entities.js';
import { generateImagesNames } from './generateImagesNames.js';

export async function createPlant(req, res) {
  const {
    imagesCount, name, description, tags, price, swap, donate, amount,
  } = req.body;
  const { userId } = req;

  checkNotUndefined({
    imagesCount, name, price, swap, donate,
  });

  if (name.length < 3) {
    return res.status(401).send({ error: 'Name with less than 3 characters' });
  }

  if (imagesCount <= 0) {
    return res.status(401).send({ error: 'Sending without images' });
  }

  if (imagesCount > 10) {
    return res.status(401).send({ error: 'Sending with more than 10 images' });
  }

  if (!donate && !swap && !price) {
    return res.status(401).send({ error: 'Sending without donate or swap or price' });
  }

  const images = generateImagesNames(imagesCount);

  const user = await User.findById(userId);
  const { location } = user;

  const sendingPlant = new SendingPlant({
    name, description, tags, price, swap, donate, userId, images, amount, location,
  });
  sendingPlant.id = sendingPlant._id;

  await sendingPlant.save();
  return res.send(sendingPlant);
}
