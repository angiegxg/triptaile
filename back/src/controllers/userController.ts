import { Request, Response } from 'express'
import * as userService from '../services/userService'

// import * as type from "../types."

export async function createUserController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw new Error('body is required')
    }
    const user = req.body
    const userData = {
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      nation: user.nation,
      avatar: user.avatar,
      role: false,
      post: [],
    }

    const newUser = await userService.createUserService(userData)
    res.status(200).json(newUser)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      err: error,
    })
  }
}

export async function checkUserController(req: Request, res: Response): Promise<void> {
  try {
    const user = req.body
    const userExists = await userService.checkUserService(user)
    res.status(200).json({ exists: userExists })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}
export async function getUserByToken(req: Request, res: Response) {
  try {
    const payload = req.user
    if (payload) {
      const user = await userService.findUserById(payload)
      res.json(user)
    } else {
      res.status(400).json({ error: 'No se pudo obtener el usuario' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function getAllUserController(_req: Request, res: Response) {
  try {
    const users = await userService.getAllUserService()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      throw new Error('params is required')
    }
    const user = await userService.findUserById(req.params.id)

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}

export async function editUserController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw new Error('body is required')
    }
    const user = await userService.editUserService(req.body)

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      throw new Error('params is required')
    }
    const user = await userService.deleteUserService(req.params.id)

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}
