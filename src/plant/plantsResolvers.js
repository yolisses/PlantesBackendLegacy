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

      const compressedImages = images.map(image=>image.replace('uploads', 'compressed').replace(/.jpeg|.jpg|.png/, '.webp'))

      const newPlant = new Plants({name, description, price, swap, donate, images:compressedImages, tags, amount});
      newPlant.id = newPlant._id;
      
      return new Promise((resolve, reject) => {
      newPlant.save((err, plant) => {
        if (err) reject(err);
        else resolve(plant);
        });
        console.error(newPlant)
      })
    }
  }
};
