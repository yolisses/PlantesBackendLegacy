export async function editPlantImages(req, res) {
  const { images } = req.body;

  console.error(images);

  return res.send(images);
}
