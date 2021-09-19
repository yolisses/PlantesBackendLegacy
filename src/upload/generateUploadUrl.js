import { s3 } from './s3.js';
import { generateRandomId } from '../utils/generateRandomId.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export async function generateUploadUrl(type) {
  const imageName = generateRandomId(16);

  const params = ({
    Expires: 60,
    Key: `items/original/${imageName}.${type}`,
    Bucket: bucketName,
  });

  return s3.getSignedUrlPromise('putObject', params);
}
