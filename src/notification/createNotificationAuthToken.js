import crypto from 'crypto';

export function createNotificationAuthToken(value) {
  const hmac = crypto.createHmac('sha256', process.env.ONESIGNAL_REST_API_KEY);
  hmac.update(value);
  const result = hmac.digest('hex');
  return result;
}
