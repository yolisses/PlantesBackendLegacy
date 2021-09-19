import { generateUploadUrl } from './generateUploadUrl.js';

export async function getUploadUrl(_, req) {
  if (!req.user) throw new Error('Not authenticated');
  return generateUploadUrl();
}
