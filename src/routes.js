import express from 'express';
import { authMiddleware } from './auth/authMiddleware.js';
import { AuthController } from './auth/AuthController.js';
import { PlantController } from './plant/PlantController.js';
import { getPlantImageUploadLink } from './upload/getPlantImageUploadLink.js';
import { UserController } from './user/UserController.js';
import { ChatController } from './chat/ChatController.js';
import { PingController } from './ping/PingController.js';

export const routes = express.Router();

routes.get('/ping', PingController.ping);

routes.post('/plants/:page', PlantController.getPlants);
routes.get('/plant/:id', PlantController.getPlant);
routes.post('/plant', authMiddleware, PlantController.createPlant);

routes.get('/search/:text?', PlantController.searchPlant);

routes.post('/plant-image-upload-link', authMiddleware, getPlantImageUploadLink);
routes.post('/confirm-plant-sending', authMiddleware, PlantController.confirmPlantSending);

routes.post('/google-sign-in', AuthController.authenticateWithGoogle);

routes.get('/user/:id', UserController.getUser);
routes.get('/user-plants/:id', UserController.getUserPlants);
routes.put('/update-profile', authMiddleware, UserController.updateProfile);

routes.post('/send-message', authMiddleware, ChatController.sendMessage);
routes.get('/chats', authMiddleware, ChatController.getUserChats);
routes.get('/chat-messages/:id', authMiddleware, ChatController.getChatMessages);
routes.post('/private-chat-by-user', authMiddleware, ChatController.getPrivateChatByUser);
