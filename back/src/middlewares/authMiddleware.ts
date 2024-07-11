import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import * as types from '../types.'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('midd')

  if (!req.headers['authorization']) {
    return res.json({ error: 'no hay token' })
  }
  const token = req.headers['authorization']

  try {
    console.log('este es auth: ' + req.headers['authorization'])
    const payload = jwt.verify(token, 'triptale') as types.TokenPayload
    console.log('ups', payload)
    if (typeof payload === 'object' && 'user_email' in payload) {
      req.user = payload.user_id
      console.log(req.user)
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
