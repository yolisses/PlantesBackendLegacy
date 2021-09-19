import { Plants } from '../db/dbConnector.js';

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
    createPlant: (root, { input }) => {
      const {
        name, description, price, swap, donate, imagesCount, tags, amount,
      } = input;
      const images = new Array(imagesCount);
      const newPlant = new Plants({
        name, description, price, swap, donate, images, tags, amount,
      });
      newPlant.id = newPlant._id;

      return new Promise((resolve, reject) => {
        newPlant.save((err) => {
          if (err) reject(err);
          else resolve(newPlant);
        });
      });
    },
  },
};
