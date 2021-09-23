import express from 'express';
import { authMiddleware } from './auth/authMiddleware.js';
import { AuthController } from './auth/AuthController.js';
import { PlantController } from './plant/PlantController.js';
import { getPlantImageUploadLink } from './upload/getPlantImageUploadLink.js';

export const routes = express.Router();

routes.get('/plants', authMiddleware, PlantController.getAllPlants);
routes.get('/plant/:id', PlantController.getPlant);
routes.post('/plant', authMiddleware, PlantController.createPlant);

routes.post('/plantImageUploadLink', authMiddleware, getPlantImageUploadLink);

routes.post('/googlesignin', AuthController.authenticateWithGoogle);
