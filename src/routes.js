import express from 'express'
import { AuthController } from './auth/authResolvers.js'
import { PlantController } from './plant/PlantController.js'

export const routes = express.Router()

routes.get('/', (req, res) => res.send({ hello: 'world' }))

routes.get('/plants', PlantController.getAllPlants)
routes.get('/plant/:id', PlantController.getPlant)
routes.post('/plant', PlantController.createPlant)

routes.post('/googlesignin', AuthController.authenticateWithGoogle)