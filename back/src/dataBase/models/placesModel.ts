import mongoose, { Schema } from 'mongoose'
import * as type from '../../types.'

// Definir el esquema de places

export const placeSchema = new Schema<type.Place>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, required: true },
  provincia: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true, index: { type: '2dsphere' } },
  },
  score: { type: Number, required: true },
})
placeSchema.index({ location: '2dsphere' })

// Crear el modelo de places

// Crear el modelo de places
const PlaceModel = mongoose.model<type.Place>('Place', placeSchema)

export default PlaceModel
