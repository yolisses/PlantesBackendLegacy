import * as OneSignal from 'onesignal-node';
import { client } from '../vendor/oneSignal.js';

export async function notificateMessage() {
  const notification = {
    contents: {
      en: 'Você recebeu uma mensagem',
    },
    include_player_ids: ['efceb687-516d-4d3d-a5b7-c66130877257'],
    filters: [],
  };

  // using async/await
  try {
    const response = await client.createNotification(notification);
    console.log(response.body.id);
  } catch (err) {
    if (err instanceof OneSignal.HTTPError) {
      // When status code of HTTP response is not 2xx, HTTPError is thrown.
      console.log(err.statusCode);
      console.log(err.body);
    }
  }
}
