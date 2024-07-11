import * as type from '../types.'
import UserModel from '../dataBase/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function createUserService(user: type.User) {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  user.password = hashedPassword

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

function createTokenService(user: type.User): string {
  const payload = { user_id: user._id, user_email: user.email, user_role: user.role }
  return jwt.sign(payload, 'triptale')
}

export async function checkUserService(user: type.Login) {
  const userfind = await UserModel.findOne({ email: user.email })

  try {
    if (userfind && userfind.password) {
      const isPasswordMatch = await bcrypt.compare(user.password, userfind.password)

      if (isPasswordMatch) {
        const token = createTokenService(userfind)
        return { token, user: userfind }
      } else {
        throw new Error('Contraseña incorrecta')
      }
    }
    return 'usuario no encontrado'
  } catch (error) {
    console.error('Error al iniciar sesion:', error)
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
