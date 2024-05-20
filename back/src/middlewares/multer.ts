import multer from 'multer'
import { extname } from 'path'

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: 'uploads',
    filename(_req, file, cb) {
      const extension = extname(file.originalname)
      const name = file.originalname.split(extension)[0]
      cb(null, `${name}--${Date.now()}${extension}`)
    },
  }),

  limits: {
    fileSize: 1024 * 1024 * 5,
  },
})

export default multerUpload
