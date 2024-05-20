export interface Place {
  _id?: string
  name: string
  type: string
  description: string
  cover: string
  provincia: string
  location: {
    type: string
    coordinates: [number, number]
  }
  score: number
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
  role: string
  post?: Array<string>
}
