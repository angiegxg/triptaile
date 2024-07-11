import express from 'express'
import * as placesController from '../controllers/placesController'
import checkToken from '../middlewares/authMiddleware'

const placesRoutes = express.Router()

placesRoutes.get('/', placesController.getAllPlacesController)
placesRoutes.post('/newplace', checkToken, placesController.createPlaceController)
placesRoutes.put('/editplace', checkToken, placesController.editPlaceController)
placesRoutes.post('/nearestplaces', placesController.nearestPlacesServiceController)
placesRoutes.get('/memoryplaces', placesController.memoryPlaceController)
placesRoutes.get('/museumplaces', placesController.loadMuseumPlacesController)
placesRoutes.get('/:id', placesController.getPlaceByIdController)
placesRoutes.delete('/:id', checkToken, placesController.deletePlaceController)

export default placesRoutes
