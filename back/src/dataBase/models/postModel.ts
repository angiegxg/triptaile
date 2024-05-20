import mongoose, { Schema, Types } from 'mongoose'

import * as type from '../../types.'

// Definir el esquema de posts

const postSchema = new Schema<type.Post>({
  idUser: { type: String, required: true },
  place: { type: Types.ObjectId, ref: 'Place' }, // Utiliza PlaceModel como tipo
  review: { type: String, required: true },
  cover: { type: String, required: true },
  rate: { type: Number, required: true },
  private: { type: Boolean, required: true }, // Asegúrate de que el tipo sea Number
})

// No es necesario indexar 'location' aquí, ya que 'location' es parte del subdocumento 'place'

// Crear el modelo de posts
const PostModel = mongoose.model<type.Post>('Post', postSchema)

export default PostModel
