import mongoose, { Schema } from 'mongoose'
// Asegúrate de que esta ruta sea correcta
import * as type from '../../types.'

// Definir el esquema de posts

const userSchema = new Schema<type.User>({
  nickname: { type: String, required: true }, // Utiliza PlaceModel como tipo
  email: { type: String, required: true },
  password: { type: String, required: true },
  nation: { type: String, required: true },
  role: { type: String, required: true },
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
})

const UserModel = mongoose.model<type.User>('User', userSchema)

export default UserModel
