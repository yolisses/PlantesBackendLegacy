import * as OneSignal from 'onesignal-node';

const appId = process.env.ONESIGNAL_APP_ID;
const apiKey = process.env.ONESIGNAL_REST_API_KEY;

export const client = new OneSignal.Client(appId, apiKey);
