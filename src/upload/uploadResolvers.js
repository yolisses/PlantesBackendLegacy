import { v4 } from 'uuid';
import { s3 } from '../vendor/s3.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export const uploadResolvers = {
  Query:
    {
      getPlantImageUploadLink: async () => {
          const imageName = v4();

          const params = ({
            Expires: 3600,
            Key: `uploads/${imageName}.jpg`,
            Bucket: bucketName,
          });

          return s3.getSignedUrlPromise('putObject', params);
      },
    },
};
