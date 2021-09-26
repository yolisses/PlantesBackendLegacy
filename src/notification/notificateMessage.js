import * as OneSignal from 'onesignal-node';
import { client } from '../vendor/oneSignal.js';

export async function notificateMessage(userId) {
  const notification = {
    contents: {
      en: 'Você recebeu uma mensagem',
    },
    include_external_user_ids: [userId],
    channel_for_external_user_ids: 'push',
  };

  try {
    const response = await client.createNotification(notification);
    console.log(response.body.id);
  } catch (err) {
    if (err instanceof OneSignal.HTTPError) {
      // When status code of HTTP response is not 2xx, HTTPError is thrown.
      console.error(err.statusCode);
      console.error(err.body);
    }
  }
}
