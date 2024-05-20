import mongoose, { Connection } from 'mongoose'
import config from './constConfig'

const uri: string = config.BD_URL || 'mongodb://localhost:27017/triptale'

mongoose
  .connect(uri)
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error))

export const db: Connection = mongoose.connection
