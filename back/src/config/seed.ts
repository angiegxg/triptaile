import UserModel from '../dataBase/models/userModel'
import { db } from './db' // Importa la configuración de la base de datos

export async function createAdmin() {
  const user = {
    nickname: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    nation: 'admin',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/020/429/953/small/admin-icon-vector.jpg',
    role: true,
    post: [],
  }

  try {
    await db
    const adminExists = await UserModel.findOne({ email: user.email })
    if (!adminExists) {
      const newUser = new UserModel(user)
      await newUser.save()
      console.log('Usuario administrador creado')
    } else {
      console.log('El usuario administrador ya existe')
    }
  } catch (error) {
    console.error('Error creando el usuario administrador:', error)
  } finally {
    db.close()
  }
}

createAdmin()
