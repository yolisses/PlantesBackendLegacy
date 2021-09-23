import { ObjectId } from 'bson';
import { VisibleError } from '../errors/VisibleError.js';

export function toID(id) {
  try {
    return ObjectId(id);
  } catch (err) {
    throw new VisibleError(400, 'Looking for a invalid ID');
  }
}
