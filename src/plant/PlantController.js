import { checkNotNull } from '../utils/checkNotNull.js';
import { Plants, SendingPlants } from '../db/entities.js';
import { generateImageName } from '../upload/generateImageName.js';
import { VisibleError } from '../errors/VisibleError.js';
import { getFileNameWithDiferentExtension } from '../utils/getFilenameWithDiferentExtension.js';
import { createCard } from '../upload/createCard.js';
import { toID } from '../utils/toID.js';

export const PlantController = {
  async getPlant(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).send({ error: 'No id provided' });
    try {
      const plant = await Plants.findById(toID(id));
      return res.send(plant);
    } catch (err) {
      return res.status(401).send(err);
    }
  },

  async getAllPlants(req, res) {
    const plants = await Plants.find();
    return res.send(plants);
  },

  async getPlants(req, res) {
    const { page } = req.params;
    const resultsPerPage = 20;
    const plants = await Plants
      .find()
      .skip(Number(page) * resultsPerPage)
      .limit(resultsPerPage);
    return res.send(plants);
  },

  async createPlant(req, res) {
    const {
      imagesTypes, name, description, tags, price, swap, donate, amount,
    } = req.body;
    const { userId } = req;

    checkNotNull({
      imagesTypes, name, price, swap, donate,
    });

    const images = imagesTypes.map(generateImageName);

    const sendingPlant = new SendingPlants({
      name, description, tags, price, swap, donate, userId, images, amount,
    });
    sendingPlant.id = sendingPlant._id;

    await sendingPlant.save();
    return res.send(sendingPlant);
  },

  async confirmPlantSending(req, res) {
    const { plantId } = req.body;
    checkNotNull({ plantId });

    const sendingPlant = await SendingPlants.findById(toID(plantId));
    if (sendingPlant === null) {
      throw new VisibleError(404, 'Sending plant not found');
    }
    const copy = { ...sendingPlant._doc };
    delete copy.__v;
    copy.card = process.env.S3_CARD_IMAGES_PATH + getFileNameWithDiferentExtension(copy.images[0], 'webp');
    copy.images = copy.images.map((key) => process.env.S3_COMPRESSED_IMAGES_PATH + getFileNameWithDiferentExtension(key, 'webp'));
    await createCard(`uploads/${sendingPlant.images[0]}`);
    await Plants.create(copy);
    return res.status(200).send(copy);
  },
};
