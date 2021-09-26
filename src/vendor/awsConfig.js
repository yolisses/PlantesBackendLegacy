const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const awsConfig = {
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
};
