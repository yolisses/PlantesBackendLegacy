import { compressImageOnS3 } from '../compress/compressImageOnS3.js';
import { Plants } from '../db/entities.js';

export const plantsResolvers = {
  Query:
    {
      getPlant: (root, { id }) => new Promise((resolve, reject) => {
        Plants.findOne({ _id: id }, (err, plant) => {
          if (err) reject(err);
          else resolve(plant);
        });
      }),
      getAllPlants: () => new Promise((resolve, reject) => {
        Plants.find((err, plants) => {
          if (err) reject(err);
          else resolve(plants);
        });
      }),
    },
  Mutation: {
    createPlant: async (root, { input }) => {
      const {
        name, description, price, swap, donate, images, tags, amount,
      } = input;

      console.error('oi 1')
      const compressedImages = await Promise.all(images.map(async image=> await compressImageOnS3(image)))
      console.error('oi 2')

      const newPlant = new Plants({
        name, description, price, swap, donate, images:compressedImages, tags, amount, originalImages:images
      });
      newPlant.id = newPlant._id;
      console.error('oi 3')

      console.error(newPlant)

      return await newPlant.save((err) => {
          if (err) throw(err);
          else resolve(newPlant);
        });
    },
  },
};
