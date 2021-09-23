import { ObjectId } from 'bson';
import { checkNotNull } from '../utils/checkNotNull.js';
import { Plants, SendingPlants } from '../db/entities.js';
import { generateImageName } from '../upload/generateImageName.js';
import { VisibleError } from '../errors/VisibleError.js';
import { db } from '../db/db.js';
import { getFileNameWithDiferentExtension } from '../utils/getFilenameWithDiferentExtension.js';

export const PlantController = {
  async getPlant(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).send({ error: 'No id provided' });
    try {
      const plant = await Plants.findById(ObjectId(id));
      return res.send(plant);
    } catch (err) {
      return res.status(401).send(err);
    }
  },

  async getAllPlants(req, res) {
    const plants = await Plants.find();
    return res.send(plants);
  },

  async createPlant(req, res) {
    const {
      imagesTypes, name, description, tags, price, swap, donate,
    } = req.body;
    const { userId } = req;

    checkNotNull({
      imagesTypes, name, price, swap, donate,
    });

    const images = imagesTypes.map(generateImageName);

    const sendingPlant = new SendingPlants({
      name, description, tags, price, swap, donate, userId, images,
    });
    sendingPlant.id = sendingPlant._id;

    await sendingPlant.save();
    return res.send(sendingPlant);
  },

  async confirmPlantSending(req, res) {
    const { plantId } = req.body;
    checkNotNull({ plantId });

    const sendingPlant = await SendingPlants.findById(ObjectId(plantId));
    if (sendingPlant === null) {
      throw new VisibleError(404, 'Sending plant not found');
    }
    const copy = { ...sendingPlant._doc };
    delete copy.__v;
    console.error('S3_COMPRESSED_IMAGES_PATH', process.env.S3_COMPRESSED_IMAGES_PATH);
    copy.images = copy.images.map((key) => process.env.S3_COMPRESSED_IMAGES_PATH + getFileNameWithDiferentExtension(key, 'webp'));
    console.error(copy);
    await Plants.create(copy);
    console.error(sendingPlant);
    return res.status(200).send(copy);
  },
};
