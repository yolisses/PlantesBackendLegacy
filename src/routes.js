import express from 'express'
import { PlantController } from './plant/PlantController.js'

export const routes = express.Router()

routes.get('/', (req, res) => res.send({ hello: 'world' }))

routes.get('/plants', PlantController.getAllPlants)