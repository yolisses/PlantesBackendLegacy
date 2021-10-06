import axios from 'axios';

const apiKey = process.env.IP_GEOLOCATION_API_KEY;

export async function getLocationByIp(
  // ip
) {
  const ip = '181.192.105.255';
  try {
    const res = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}&fields=state_prov,city,latitude,longitude`);
    return res.data;
  } catch (err) {
    // console.error(err);
  }
  return null;
}
