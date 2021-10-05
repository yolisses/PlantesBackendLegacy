import express from 'express';
import { authMiddleware } from './auth/authMiddleware.js';
import { AuthController } from './auth/AuthController.js';
import { getPlantImageUploadLink } from './upload/getPlantImageUploadLink.js';
import { UserController } from './user/UserController.js';
import { ChatController } from './chat/ChatController.js';
import { PingController } from './ping/PingController.js';
import { getPlant } from './plant/getPlant.js';
import { getPlants } from './plant/getPlants.js';
import { createPlant } from './plant/createPlant.js';
import { confirmPlantSending } from './plant/confirmPlantSending.js';

export const routes = express.Router();

routes.get('/ping', PingController.ping);

routes.get('/plant/:id', getPlant);
routes.post('/plants/:page', getPlants);
// routes.get('/search/:text?', searchPlant);
routes.post('/plant', authMiddleware, createPlant);
routes.post('/confirm-plant-sending', authMiddleware, confirmPlantSending);
routes.post('/plant-image-upload-link', authMiddleware, getPlantImageUploadLink);

routes.post('/google-sign-in', AuthController.authenticateWithGoogle);

routes.get('/user/:id', UserController.getUser);
routes.get('/user-plants/:id', UserController.getUserPlants);
routes.put('/update-profile', authMiddleware, UserController.updateProfile);

routes.post('/send-message', authMiddleware, ChatController.sendMessage);
routes.get('/chats', authMiddleware, ChatController.getUserChats);
routes.get('/chat-messages/:id', authMiddleware, ChatController.getChatMessages);
routes.post('/private-chat-by-user', authMiddleware, ChatController.getPrivateChatByUser);
