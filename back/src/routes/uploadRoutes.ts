import express from 'express'
import * as uploadController from '../controllers/uploadController'
import multerUpload from '../config/multerConfig' // Asegúrate de que la ruta del archivo de configuración sea correcta

const uploadRoutes = express.Router()

uploadRoutes.post('/', multerUpload.single('file'), uploadController.uploadController)

export default uploadRoutes
