import { Request, Response } from 'express'
import * as userService from '../services/userService'
// import * as type from "../types."

export async function createUserController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw console.error('request body is required')
    }

    const user = req.body
    const newUser = await userService.createUserService(user)
    res.status(200).json(newUser)

    console.log('Lugar creado exitosamente:', newUser)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      err: error,
    })
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
      throw console.error('request params is required')
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
      throw console.error('request body is required')
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
      throw console.error('request params is required')
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
