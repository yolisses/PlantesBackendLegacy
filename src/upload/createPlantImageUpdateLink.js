import { v4 } from 'uuid';
import { s3 } from '../vendor/s3.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export async function createPlantImageUpdateLink(type) {
  const supportedTypes = {
    png: 'png',
    jpg: 'jpg',
    jpeg: 'jpg',
  };

  if (!supportedTypes[type]) {
    throw new Error('Unsupported image file type');
  }

  const imageName = v4();

  const params = ({
    Key: `uploads/${imageName}.${supportedTypes[type]}`,
    Expires: 60 * 60, // one hour
    Bucket: bucketName,
  });

  const url = await s3.getSignedUrlPromise('putObject', params);
  return url;
}
