// import jwt from 'jsonwebtoken'
// import { Request, Response, NextFunction } from 'express'
// import * as type from '../types.'

// export function authenticateToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401) // No token provided

//   jwt.verify(token, 'triptale', (err, user) => {
//     if (err) return res.sendStatus(403) // Invalid token

//     req.user = user as type.AuthenticatedRequest
//     next() // Continue with the request
//   })
// }
