import express from 'express';
import { authMiddleware } from './auth/authMiddleware.js';
import { AuthController } from './auth/AuthController.js';
import { PlantController } from './plant/PlantController.js';

export const routes = express.Router();

routes.get('/plants', authMiddleware, PlantController.getAllPlants);
routes.get('/plant/:id', PlantController.getPlant);
routes.post('/plant', PlantController.createPlant);

routes.post('/googlesignin', AuthController.authenticateWithGoogle);
