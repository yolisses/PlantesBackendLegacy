import AWS from 'aws-sdk';
import { awsConfig } from './awsConfig.js';

export const s3 = new AWS.S3(awsConfig);
