import admin from 'firebase-admin';

export default async (req, res, next) => {
  const { token } = req.body;

  if (!token) return res.status('400').send('No Google token provided');

  try {
    const payload = await admin.auth().verifyIdToken(token);
    req.payload = payload;
    return next();
  } catch (err) {
    return res.status('400').send(err);
  }
};