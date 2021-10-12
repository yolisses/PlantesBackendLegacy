export async function editPlantImages(req, res) {
  const { images } = req.body;
  const { userId } = req;

  const plant = Plant;

  for (const image of images) {

  }

  console.error(images);

  return res.send(images);
}
