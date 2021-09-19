import { plantsResolvers } from '../plant/plantsResolvers.js';
import { uploadResolvers } from '../upload/uploadResolvers.js';

export const resolvers = [
  plantsResolvers,
  uploadResolvers,
];
