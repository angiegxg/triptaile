import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { db } from './config/db' // Importa la conexión a la base de datos desde db.ts
import placesRoutes from './routes/placesRoutes'
import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import config from './config/constConfig'
import uploadRoutes from './routes/uploadRoutes'
import path from 'path'
import cors from 'cors'

const PORT = config.PORT || 3000
const app = express()
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))
app.options('*', cors())
app.use(express.json())
app.use('/places', placesRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/uploads', express.static(path.join('uploads')))

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

// Manejo de errores de la conexión a la base de datos
db.on('error', (error: unknown) => {
  console.error('Error al conectar a MongoDB:', error)
})
