import { ObjectId } from 'bson';
import { checkNotNull } from '../utils/checkNotNull.js';
import { Plants, SendingPlants } from '../db/entities.js';
import { generateImageName } from '../upload/generateImageName.js';

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
    return res.send({ sendingPlant });
  },

};
