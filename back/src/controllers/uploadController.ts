import { Request, Response, RequestHandler } from 'express'

// Definición de la función uploadController usando una función normal
export const uploadController: RequestHandler = function (req: Request, res: Response) {
  const { file } = req
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  try {
    return res.status(200).json({
      message: 'Upload',
      url: `http://localhost:3000/uploads/${file.filename}`,
      name: file.filename,
    })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({
      message: 'Failed to upload',
      error: err.message,
    })
  }
}
