import { v4 } from 'uuid';

export function generateImagesNames(amount) {
  const result = [];
  for (let i = 0; i < amount; i++) {
    result.push(`${v4()}.webp`);
  }
  return result;
}
