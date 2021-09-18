import { Friends, Plants, Series } from '../db/dbConnector.js';

/**
* GraphQL Resolvers
* */

export const resolvers = {
  Query: {
    getAllPlants: (root) => new Promise((resolve, reject) => {
      Plants.find((err, plants) => {
        if (err) reject(err);
        else resolve(plants);
      });
    }),
    getAllFriends: (root) => new Promise((resolve, reject) => {
      Friends.find((err, friends) => {
        if (err) reject(err);
        else resolve(friends);
      });
    }),
    findASeries: (root, { id }) => new Promise((resolve, reject) => {
      Series.findOne({ _id: id }, (err, series) => {
        if (err) reject(err);
        else resolve(series);
      });
    }),
  },
  Mutation: {
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.lastName,
        gender: input.gender,
        language: input.language,
        age: input.age,
        email: input.email,
        contacts: input.contacts,
      });

      newFriend.id = newFriend._id;

      return new Promise((resolve, reject) => {
        newFriend.save((err) => {
          if (err) reject(err);
          else resolve(newFriend);
        });
      });
    },
    createPlant: (root, { input }) => {
      const {
        name, description, price, swap, donate, imagesCount, tags, part,
      } = input;
      const images = new Array(imagesCount);
      const newPlant = new Plants({
        name, description, price, swap, donate, images, tags, part,
      });
      newPlant.id = newPlant._id;

      return new Promise((resolve, reject) => {
        newPlant.save((err) => {
          if (err) reject(err);
          else resolve(newPlant);
        });
      });
    },
    addASeries: (root, { series }) => {
      const newSeries = new Series({
        seriesName: series.seriesName,
        year: series.year,
        rating: series.rating,
      });

      newSeries.id = series._id;

      return new Promise((resolve, reject) => {
        newSeries.save((err) => {
          if (err) reject(err);
          resolve(newSeries);
        });
      });
    },
  },
};
