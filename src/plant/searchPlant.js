import { Plant } from '../db/entities.js';

export async function searchPlant(req, res) {
  const { text } = req.query;

  const result = await Plant
    .find(
      { $text: { $search: text } },
      { score: { $meta: 'textScore' } },
    )
    .sort({ score: { $meta: 'textScore' } })
    .exec();
  return res.send(result);
}
