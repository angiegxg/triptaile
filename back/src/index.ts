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
// app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
//   console.error('Error stack:', err instanceof Error ? err.stack : 'No stack available')
//   console.error('Error message:', err instanceof Error ? err.message : 'No message available')

//   res.status(500).json({
//     message: 'Internal server error',
//     error:
//       err instanceof Error?
//          {
//             message: err.message,
//             stack: err.stack,
//           }
//         : {
//             message: 'An unknown error occurred',
//           },
//   })
// })

// Espera a que se establezca la conexión a la base de datos antes de escuchar en el puerto
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})

// Manejo de errores de la conexión a la base de datos
db.on('error', (error: unknown) => {
  console.error('Error al conectar a MongoDB:', error)
})
