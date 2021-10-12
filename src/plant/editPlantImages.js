import { Plant } from '../db/entities.js';

export async function editPlantImages(req, res) {
  const { images } = req.body;
  const { id } = req.params;
  const { userId } = req;

  const plant = await Plant.findById(id).exec();

  if (!plant) {
    return res.status(404).send({ error: 'Plant not found' });
  }

  if (plant.userId !== userId) {
    return res.status(403).send({ error: 'User unauthorized to change plant' });
  }

  const result = []
  for(let image of images){
    if(image)
  }


  return res.send(images);
}
