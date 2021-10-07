import { checkNotUndefined } from '../utils/checkNotUndefined.js';
import { generateImageName } from '../upload/generateImageName.js';
import { SendingPlant, User } from '../db/entities.js';

export async function createPlant(req, res) {
  const {
    imagesTypes, name, description, tags, price, swap, donate, amount,
  } = req.body;
  const { userId } = req;

  checkNotUndefined({
    imagesTypes, name, price, swap, donate,
  });

  if (name.length < 3) {
    return res.status(401).send({ error: 'Name with less than 3 characters' });
  }

  if (imagesTypes.length <= 0) {
    return res.status(401).send({ error: 'Sending without images' });
  }

  if (imagesTypes.length > 10) {
    return res.status(401).send({ error: 'Sending with more than 10 images' });
  }

  if (!donate && !swap && !price) {
    return res.status(401).send({ error: 'Sending without donate or swap or price' });
  }

  const images = imagesTypes.map(generateImageName);

  const user = await User.findById(userId);
  const { location } = user;

  const sendingPlant = new SendingPlant({
    name, description, tags, price, swap, donate, userId, images, amount, location,
  });
  sendingPlant.id = sendingPlant._id;

  await sendingPlant.save();
  return res.send(sendingPlant);
}
