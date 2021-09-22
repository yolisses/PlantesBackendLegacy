import { VisibleError } from './VisibleError.js';

// eslint-disable-next-line no-unused-vars
export function errorsMiddleware(err, req, res, next) {
  console.error(err);
  if (err instanceof VisibleError) {
    return res.status(err.status).send({ error: err.message });
  } return res.status(500).send({ error: 'Unexpected error' });
}
