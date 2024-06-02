import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers['authorization']) {
    return res.json({ error: 'no hay token' })
  }
  const token = req.headers['authorization']

  try {
    console.log('este es auth: ' + req.headers['authorization'])
    const payload = jwt.verify(token, 'triptale')
    console.log(payload)
    next()
    return
  } catch (err) {
    return res.json({ error: 'token incorrecto' })
  }
}
export default checkToken
