
import { OAuth2Client } from 'google-auth-library';
import { getOrCreateUser } from '../user/getOrCreateUser.js';
import { generateToken } from './generateToken.js';
const client = new OAuth2Client();

export const authResolvers = {
    Query: {
        authenticateWithGoogle: async (root, { token:googleToken }) => {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: googleToken,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                const {name, email} = payload

                const user = await getOrCreateUser({name, email})
                return generateToken({id:user.id})
            } catch (err) {
                console.error(err)
            }
        }
    }
}