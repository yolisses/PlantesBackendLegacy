import { checkNotUndefined } from '../utils/checkNotUndefined.js';
import { Plant, SendingPlant } from '../db/entities.js';
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
      const plant = await Plant.findById(toID(id));
      return res.send(plant);
    } catch (err) {
      return res.status(401).send(err);
    }
  },

  async searchPlant(req, res) {
    const { text } = req.query;

    const result = await Plant
      .find(
        { $text: { $search: text } },
        { score: { $meta: 'textScore' } },
      )
      .sort({ score: { $meta: 'textScore' } })
      .exec();
    return res.send(result);
  },

  async getAllPlants(req, res) {
    const plants = await Plant.find();
    return res.send(plants);
  },

  async getPlants(req, res) {
    const { page } = req.params;
    console.error(req.body);
    const {
      donate, sell, swap, text, tags,
    } = req.body;

    let query = { };
    const orQuery = [];

    if (donate || swap || sell) {
      if (donate) { orQuery.push({ donate: true }); }
      if (swap) { orQuery.push({ swap: true }); }
      if (sell) { orQuery.push({ price: { $ne: null } }); }
      query = { $or: orQuery };
    }

    if ((tags && tags.length) || text) {
      let textQuery = '';
      if (text) {
        textQuery += text;
      }
      if (tags) {
        tags.forEach((tag) => { textQuery += ` ${tag}`; });
      }
      query.$text = { $search: textQuery };
    }

    console.error(query);

    const resultsPerPage = 20;
    const plants = await Plant
      .find(query)
      .skip(Number(page) * resultsPerPage)
      .limit(resultsPerPage);
    console.error(plants);
    return res.send(plants);
  },

  async createPlant(req, res) {
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

    const sendingPlant = new SendingPlant({
      name, description, tags, price, swap, donate, userId, images, amount,
    });
    sendingPlant.id = sendingPlant._id;

    await sendingPlant.save();
    return res.send(sendingPlant);
  },

  async confirmPlantSending(req, res) {
    const { plantId } = req.body;
    checkNotUndefined({ plantId });

    const sendingPlant = await SendingPlant.findById(toID(plantId));
    if (sendingPlant === null) {
      throw new VisibleError(404, 'Sending plant not found');
    }
    const copy = { ...sendingPlant._doc };
    delete copy.__v;
    copy.card = process.env.S3_CARD_IMAGES_PATH + getFileNameWithDiferentExtension(copy.images[0], 'webp');
    copy.images = copy.images.map((key) => process.env.S3_COMPRESSED_IMAGES_PATH + getFileNameWithDiferentExtension(key, 'webp'));
    await createCard(`uploads/${sendingPlant.images[0]}`);
    await Plant.create(copy);
    return res.status(200).send(copy);
  },
};
