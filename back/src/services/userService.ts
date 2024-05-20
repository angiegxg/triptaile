import * as type from '../types.'
import UserModel from '../dataBase/models/userModel'
import * as crypto from 'crypto'

export async function createUserService(user: type.User) {
  // Hash de la contraseña
  const salt = crypto.randomBytes(16).toString('hex')
  const hashedPassword = crypto.pbkdf2Sync(user.password, salt, 1000, 64, 'sha512').toString('hex')
  user.password = hashedPassword
  // Crear el nuevo usuario
  const newUser = new UserModel(user)

  try {
    // Guardar el nuevo usuario en la base de datos
    await newUser.save()
    console.log('Usuario creado exitosamente')
    return newUser
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    throw error
  }
}

export async function getAllUserService() {
  try {
    const UserList = await UserModel.find()
    return UserList
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}

export async function editUserService(user: type.User) {
  try {
    const editUser = new UserModel(user)
    await UserModel.findByIdAndUpdate(user._id, user)
    return editUser
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}

export async function findUserById(id: string) {
  try {
    const user = await UserModel.findById(id)
    if (user) {
      return user
    }

    return null
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}

export async function deleteUserService(id: string) {
  try {
    const user = await UserModel.findByIdAndDelete(id)
    return user
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}
