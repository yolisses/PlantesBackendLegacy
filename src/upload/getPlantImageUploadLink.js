import { ObjectId } from 'bson';
import { SendingPlants } from '../db/entities.js';
import { VisibleError } from '../errors/VisibleError.js';
import { checkNotNull } from '../utils/checkNotNull.js';
import { s3 } from '../vendor/s3.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export async function getPlantImageUploadLink(req, res) {
  const { plantId, image } = req.body;
  checkNotNull({ plantId, image });

  const sendingPlant = await SendingPlants.findById(ObjectId(plantId));
  if (!sendingPlant) {
    throw new VisibleError(404, 'Plant not found');
  }
  if (sendingPlant.userId !== req.userId) {
    throw new VisibleError(401, 'Plant not owned by user');
  }
  if (sendingPlant.images.indexOf(image) === -1) {
    throw new VisibleError(401, "Image don't match with the plant");
  }

  const params = ({
    Key: `uploads/${image}`,
    Expires: 60 * 60, // one hour
    Bucket: bucketName,
  });

  const url = await s3.getSignedUrlPromise('putObject', params);
  return res.send(url);
}
