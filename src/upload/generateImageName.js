import { v4 } from 'uuid';

export function generateImageName() {
  return `${v4()}.webp`;
}
