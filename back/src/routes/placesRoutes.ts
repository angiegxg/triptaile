import express from 'express'
import * as placesController from '../controllers/placesController'

const placesRoutes = express.Router()

placesRoutes.get('/', placesController.getAllPlacesController)
placesRoutes.post('/newplace', placesController.createPlaceController)
placesRoutes.put('/editplace', placesController.editPlaceController)
placesRoutes.post('/nearestplaces', placesController.nearestPlacesServiceController)
placesRoutes.get('/memoryplaces', placesController.memoryPlaceController)
placesRoutes.get('/museumplaces', placesController.loadMuseumPlacesController)
placesRoutes.get('/:id', placesController.getPlaceByIdController)
placesRoutes.delete('/:id', placesController.deletePlaceController)

export default placesRoutes
