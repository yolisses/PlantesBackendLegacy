const examples_resolvers = {
  Query: {
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
