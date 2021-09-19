import { v4 } from 'uuid';
import { s3 } from './s3.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export const uploadResolvers = {
  Query:
    {
      getPlantImagesLinks: async (root, { amount }) => {
        if (amount < 0 || amount > 10) {
          throw new Error('Maximum of 10 images upload');
        }

        const promisses = [];
        for (let i = 0; i < amount; i++) {
          const imageName = v4();

          const params = ({
            Expires: 60,
            Key: `items/original/${imageName}.jpg`,
            Bucket: bucketName,
          });

          const promisse = s3.getSignedUrlPromise('putObject', params);
          promisses.push(promisse);
        }

        return Promise.all(promisses);
      },
    },
};
