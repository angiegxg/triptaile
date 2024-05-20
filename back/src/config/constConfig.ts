import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const config = {
  BD_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  HOST_URL: process.env.HOST_URL,
  IMG_URL: process.env.IMG_URL,
  FILE_URL: path.join(__dirname, '../../uploads'),
  FILE_SERVER_URL: process.env.FILE_SERVER,
}

export default config
