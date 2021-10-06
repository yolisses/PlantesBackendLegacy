import axios from 'axios';

const apiKey = process.env.LOCATIONIQ_API_KEY;

export async function getLocationByCoordinates({ latitude, longitude }) {
  try {
    const res = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&accept-language=pt&format=json`);
    return res.data.address;
  } catch (err) {
    console.error(err);
  }
  return null;
}
