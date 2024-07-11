import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as types from '../types.'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers['authorization']) {
    return res.json({ error: 'no hay token' })
  }
  const token = req.headers['authorization']

  try {
    const payload = jwt.verify(token, 'triptale') as types.TokenPayload
    if (typeof payload === 'object' && 'user_email' in payload) {
      req.user = payload.user_id
    } else {
      throw new Error('El payload del token no es válido')
    }
    next()
    return
  } catch (err) {
    return res.json({ error: 'token incorrecto' })
  }
}
export default checkToken
