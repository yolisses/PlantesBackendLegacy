import { Plants } from '../db/entities.js';
import { createCard } from '../upload/createCard.js';

export const PlantController = {
  async getPlant(req, res) {
    const plant = await Plants.findOne({ _id: id })
    return plant
  },

  async getAllPlants(req, res) {
    const plants = await Plants.find()
    return res.send(plants)
  },

  async createPlant(req, res) {
    const {
      name, description, price, swap, donate, images, tags, amount,
    } = req.body;

    const firstImageKey = (images[0]).replace('https://plantei-dev.s3.sa-east-1.amazonaws.com/', '')

    await createCard(firstImageKey)

    const compressedImages = images.map(image => image.replace('uploads', 'compressed').replace(/.jpeg|.jpg|.png/, '.webp'))

    const newPlant = new Plants({ name, description, price, swap, donate, images: compressedImages, tags, amount });
    newPlant.id = newPlant._id;
    newPlant.card = images[0].replace('uploads', 'cards').replace(/.jpeg|.jpg|.png/, '.webp')


    await newPlant.save((err, plant) => {
      if (err) return err;
      else return plant;
    });
  }
};
