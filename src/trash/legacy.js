const {
    name, description, price, swap, donate, images, tags, amount,
  } = req.body;

  const firstImageKey = (images[0]).replace('https://plantei-dev.s3.sa-east-1.amazonaws.com/', '');

  await createCard(firstImageKey);

  const compressedImages = images.map((image) => image.replace('uploads', 'compressed').replace(/.jpeg|.jpg|.png/, '.webp'));

  const newPlant = new Plants({
    name,
    swap,
    tags,
    price,
    amount,
    donate,
    images: compressedImages,
    description,
  });
  newPlant.id = newPlant._id;

  newPlant.card = images[0].replace('uploads', 'cards').replace(/.jpeg|.jpg|.png/, '.webp');

  await newPlant.save();
  return res.send(newPlant);