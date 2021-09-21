import AWS from 'aws-sdk';
import { awsConfig } from './awsConfig.js';

export const lambda = new AWS.Lambda(awsConfig)
