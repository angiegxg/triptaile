import multer from 'multer'
import { extname } from 'path'

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: 'uploads',
    filename: (_req, file, cb) => {
      // Generar un nombre de archivo único basado en el nombre original y la fecha actual
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      const extension = extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    },
  }),
  // Filtro para aceptar solo ciertos tipos de archivos
  fileFilter: (_req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png']
    const ext = extname(file.originalname).toLowerCase()
    if (allowedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Tipo de archivo no permitido. Solo se permiten archivos JPG, JPEG y PNG.'))
    }
  },
})

export default multerUpload
