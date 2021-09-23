import { v4 } from 'uuid';
import { VisibleError } from '../errors/VisibleError.js';

export function generateImageName(type) {
  const supportedTypes = {
    png: 'png',
    jpg: 'jpg',
    jpeg: 'jpg',
  };
  if (!supportedTypes[type]) {
    throw new VisibleError(400, `Unsupported image file type: ${type}`);
  }
  return `${v4()}.${supportedTypes[type]}`;
}
