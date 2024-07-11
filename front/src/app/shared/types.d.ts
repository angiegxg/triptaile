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

  export interface Location{
    
      type: string
      coordinates: [number, number]
    
  }
  
  export interface Post {
    _id: string
    idUser: string
    place: string | Place
    review: string
    cover: string
    rate: number
    private: Bolean
  }

  export type postCreate = Omit<Post, '_id'>;

  
  export interface User {
    _id?: string
    nickname: string
    email: string
    password: string
    nation: string
    avatar:string
    role: bolean
    post?: Array<string>
  }

  export type UserRegister = Omit<User, 'role'>;
  export type decodeToken = Omit<User, 'password', 'nation','avatar','post'>;
  export interface Login {
    email: string
    password: string
  }

  export interface ResponseLogin{
    exists: {
      token: string,
      user: User
  }
}
  