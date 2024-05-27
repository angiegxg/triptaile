import { Request, Response } from 'express'
import * as placeService from '../services/placesService'

export async function createPlaceController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw console.error('request body is required')
    }

    const place = req.body
    const newPlace = await placeService.createPlaceService(place)
    res.status(200).json({ data: newPlace })

    console.log('Lugar creado exitosamente:', newPlace)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error h',
      err: error,
    })
  }
}

export async function editPlaceController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw console.error('request body is required')
    }

    const place = req.body
    const editPlace = await placeService.editPlaceService(place)
    res.status(200).json(editPlace)

    console.log('Lugar creado exitosamente:', editPlace)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error g',
      err: error,
    })
  }
}

export async function memoryPlaceController(_req: Request, res: Response) {
  try {
    const placesMemory = await placeService.memoryPlaceService()
    res.status(200).json({ data: placesMemory })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error f',
      err: err,
    })
  }
}

export async function loadMuseumPlacesController(_req: Request, res: Response) {
  try {
    console.log('entro a museumPlaceController')
    const placesMuseum = await placeService.museumPlaceService()
    res.status(200).json({ data: placesMuseum })
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error e',
      err: err,
    })
  }
}

export async function getPlaceByIdController(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      throw console.error('request body is required')
    }
    const place = await placeService.getAPlaceByIdService(req.params.id)
    res.status(200).json(place)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error d',
      err: err,
    })
  }
}

export async function getAllPlacesController(_req: Request, res: Response) {
  try {
    const places = await placeService.getAllPlacesService()
    res.status(200).json(places)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error c',
      err: err,
    })
  }
}

export async function nearestPlacesServiceController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw console.error('request body is required')
    }

    const location = req.body
    console.log(location)
    const nearestPlaceList = await placeService.nearestPlacesService(location)
    res.status(200).json(nearestPlaceList)

    console.log('Lugares cercanos:', nearestPlaceList)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error bbb',
      err: error,
    })
  }
}

export async function deletePlaceController(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      throw 'params.id is required'
    }
    const place = await placeService.deletePlaceService(req.params.id)
    res.status(200).json(place)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error aaa',
      err: error,
    })
  }
}

export async function updateScoreController(idPlace: string, newScorePlace: number) {
  try {
    const place = await placeService.updateScoreService(idPlace, newScorePlace)

    return 'Score Actualization' + place
  } catch (error) {
    throw console.error('error updating Score')
  }
}
