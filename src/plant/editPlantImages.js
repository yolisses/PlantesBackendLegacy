export async function editPlantImages(req, res) {
  const { images } = req;

  return res.send(images);
}
