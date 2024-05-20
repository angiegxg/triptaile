import { Request, Response } from 'express'
import * as postService from '../services/postService'
import * as placeController from './placesController'

export async function createPostController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw console.error('request body is required')
      // return res.status(400).json({ message: "Request body is required" });
    }

    const post = req.body

    if (req.body.place) {
      req.body.place = JSON.parse(req.body.place)
    }

    // Verificar si hay un archivo en la solicitud
    if (req.file) {
      // Crear la URL de la imagen
      const imgURL = `http://localhost:3000/uploads/${req.file.filename}`
      post.cover = imgURL
    } else {
      throw console.error('request body is required')
      // return res.status(400).json({ message: "Image file is required" });
    }
    const newScorePlace = await calculatePlaceScoreController(post.place._id)

    if (newScorePlace) {
      await placeController.updateScoreController(post.place._id, newScorePlace)
    }
    const newPost = await postService.createPostService(post)

    console.log('Post creado exitosamente:', newPost)
    res.status(200).json(post)
  } catch (error: any) {
    console.error('Internal server error:', error)
    res.status(500).json({
      message: 'Internal server error',
      err: error.message,
    })
  }
}

export async function calculatePlaceScoreController(placeId: string) {
  try {
    const newScorePlace = await postService.calculatePlaceScoreService(placeId)
    return newScorePlace
  } catch (err) {
    throw console.error('error in calculatePlaceScoreService')
  }
}

export async function editPostController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw console.error('request body is required')
    }

    const post = req.body
    const newPost = await postService.editPostService(post)
    console.log('Post editado exitosamente:', newPost)
    res.status(200).json(newPost)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      err: error,
    })
  }
}

export async function getAllUserController(_req: Request, res: Response) {
  try {
    const postList = await postService.getAllPostService()
    res.status(200).json(postList)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}

export async function getPostByIdController(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      throw console.error('request body is required')
    }
    const post = await postService.getPostByIdService(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}
export async function getPostByIdUserController(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      throw console.error('request body is required')
    }
    const postList = await postService.getPostByUserIdService(req.params.id)
    res.status(200).json(postList)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}

export async function deletePostController(req: Request, res: Response) {
  try {
    if (!req.body) {
      throw console.error('request body is required')
    }

    const id = req.params.id
    const deletePost = await postService.deletePostService(id)
    res.status(200).json(deletePost)
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      err: err,
    })
  }
}
