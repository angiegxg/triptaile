import PlaceModel from '../dataBase/models/placesModel'
import * as type from '../types.'
import * as memoryPlaces from '../dataBase/data/memoryPlace.json'
import * as museumPlaces from '../dataBase/data/museos.json'

export async function createPlaceService(place: type.Place) {
  try {
    const nuevoPlace = new PlaceModel(place)
    const placeSave = await nuevoPlace.save()

    console.log('Lugar creado exitosamente:', placeSave)
  } catch (error) {
    console.error('Error al crear el lugar:', error)
  }
}

export async function editPlaceService(place: type.Place) {
  try {
    const editPlace = new PlaceModel(place)
    await PlaceModel.findByIdAndUpdate(place._id, editPlace)
    console.log('Lugar editado exitosamente:', editPlace)
    return editPlace
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function museumPlaceService() {
  try {
    console.log('entro al museumPlaceService ')
    const museumPlacesData = Object.values(museumPlaces)
    museumPlacesData.forEach((place: any) => {
      if (place.name) {
        console.log(place)
        const latitud = parseFloat(place.latitude.replace(',', '.'))
        const longitud = parseFloat(place.longitude.replace(',', '.'))

        const memoryplace: type.Place = {
          name: place.name,
          type: 'Museum',
          description: place.observations !== undefined ? place.observations : 'por definir',
          cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_Andaluc%C3%ADa.svg/2000px-Flag_of_Andaluc%C3%ADa.svg.png',
          provincia: place.province,
          location: {
            type: 'Point',
            coordinates: [latitud, longitud],
          },
          score: place.score || 0,
        }
        console.log()
        createPlaceService(memoryplace)
      }
    })
  } catch (error) {
    console.error('Error al crear el lugar:', error)
  }
}

export async function memoryPlaceService() {
  try {
    const memoryPlacesData = Object.values(memoryPlaces)
    memoryPlacesData.forEach((place: any) => {
      if (place.title) {
        const memoryplace: type.Place = {
          name: place.title,
          type: 'Memory Place',
          description: 'por definir',
          cover: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_Andaluc%C3%ADa.svg/2000px-Flag_of_Andaluc%C3%ADa.svg.png',
          provincia: place.province[0].province,
          location: {
            type: 'Point',
            coordinates: [+place.latitude, +place.longitude],
          },
          score: place.score || 0,
        }
        createPlaceService(memoryplace)
      }
    })
  } catch (error) {
    console.error('Error al crear el lugar:', error)
  }
}

export async function getAllPlacesService() {
  try {
    const placeList = await PlaceModel.find()
    return placeList
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}

export async function getAPlaceByIdService(id: string) {
  try {
    const place = await PlaceModel.findById(id)
    return place
  } catch (error: unknown) {
    throw new Error('Error ')
  }
}

export async function nearestPlacesService(place: type.Place) {
  try {
    const { coordinates } = place.location

    const minDistance = 1000 // Distancia mínima en metros
    const maxDistance = 5000000

    console.log('estoy en el servicio')
    const lugaresCercanos = await PlaceModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates,
          },
          $minDistance: minDistance,
          $maxDistance: maxDistance,
        },
      },
    })

    console.log('Lugares ordenados por cercanía:', lugaresCercanos)
    return lugaresCercanos
  } catch (error) {
    throw new Error('Error al buscar los lugares ordenados por distancia')
  }
}

export async function deletePlaceService(id: string) {
  try {
    const place = await PlaceModel.findByIdAndDelete(id)
    return place
  } catch (error) {
    throw new Error('Error al eliminar el lugar')
  }
}

export async function updateScoreService(id: string, score: number) {
  try {
    const place = await PlaceModel.findOneAndUpdate(
      { _id: id }, // Filtro para encontrar el documento por id
      { $set: { score: score } }, // Actualización: establece el nuevo valor del campo score
      { new: true }, // Opciones: devuelve el documento actualizado
    )

    if (!place) {
      throw new Error('Lugar no encontrado')
    }

    return place
  } catch (error: any) {
    throw new Error('Error al actualizar el lugar: ' + error.message)
  }
}
