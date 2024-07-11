import { Request } from 'express'
export interface Place {
  _id?: string
  name: string
  type: string
  description: string
  cover: string
  provincia: string
  location: Location
  score: number
}

export interface Location {
  type: string
  coordinates: [number, number]
}

export interface Post {
  _id?: string
  idUser: string
  place: Place
  review: string
  cover: string
  rate: number
  private: Bolean
}

export interface User {
  _id?: string
  nickname: string
  email: string
  password: string
  nation: string
  role: Bolean
  avatar: string
  post?: Array<string>
}

export interface Login {
  email: string
  password: string
}

export interface TokenPayload {
  user_id: string
  user_email: string
  user_role: boolean
  iat: number
}

interface AuthenticatedRequest extends Request {
  user?: string
}

declare global {
  namespace Express {
    export interface Request {
      user?: string
    }
  }
}
