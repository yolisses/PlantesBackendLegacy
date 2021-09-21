
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client();

export const authResolvers = {
    Query: {
        authenticateWithGoogle: async (root, { token }) => {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                return JSON.stringify(payload)
            } catch (err) {
                console.error(err)
            }
        }
    }
}