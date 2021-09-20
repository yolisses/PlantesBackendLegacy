import { s3 } from './s3.js';
import { generateRandomId } from '../utils/generateRandomId.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export async function generateUploadUrl(type) {
  const imageName = generateRandomId(16);

  const oneHour = 3600
  
  const params = ({
    Expires: oneHour,
    Key: `items/original/${imageName}.${type}`,
    Bucket: bucketName,
  });

  return s3.getSignedUrlPromise('putObject', params);
}
