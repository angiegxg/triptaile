// import * as type from "../types."
// import PostModel from "../dataBase/models/postModel"
// import * as userService from "./userService"

// export async function createPostService(post:type.Post) {
//     try {
//         const newPost= new PostModel(post)
//         await newPost.save();
//         const user = await userService.findUserById(post.idUser);

//             user?.post?.push(newPost._id)
//             await user?.save()

//         console.log('Post creado exitosamente');
//         return newPost;
//     } catch (error) {
//         console.error('Error al crear el usuario:', error);
//         throw error;
//     }
// }
import * as type from '../types.'
import PostModel from '../dataBase/models/postModel'
import * as userService from './userService'

export async function createPostService(post: type.Post) {
  try {
    // Crear el nuevo post
    const newPost = new PostModel(post)

    await newPost.save()

    // Encontrar el usuario asociado al post por su ID
    const user = await userService.findUserById(newPost.idUser)
    console.log(user)

    if (!user) {
      throw new Error('No se encontró el usuario asociado al post.')
    }

    if (!user.post) {
      user.post = []
    }

    user.post.push(newPost._id)
    await user.save()

    console.log('Post creado exitosamente')
    return newPost
  } catch (error) {
    console.error('Error al crear el post:', error)
    throw error
  }
}

export async function calculatePlaceScoreService(placeId: string) {
  try {
    const reviews = await PostModel.find({ place: placeId })

    if (reviews.length === 0) {
      return 0 // Si no hay lugares, el promedio es 0
    }

    const rates = reviews.map((rate) => rate.rate)

    const totalRate = rates.reduce((sum, rate) => sum + rate, 0)

    const averageRate = totalRate / rates.length

    console.log('este es el nuevo score del lugar: ' + averageRate)

    return averageRate
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}

export async function editPostService(post: type.Post) {
  try {
    const editPost = new PostModel(post)
    await PostModel.findByIdAndUpdate(editPost._id, editPost)
    return editPost
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}

export async function getAllPostService() {
  try {
    const postList = await PostModel.find()
    return postList
  } catch (error: unknown) {
    throw new Error('Error fetching places')
  }
}

export async function getPostByIdService(id: string) {
  try {
    const post = await PostModel.findById(id)
    return post
  } catch (error: unknown) {
    throw new Error('Error de busqueda por id')
  }
}

export async function deletePostService(postId: string) {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId)

    if (!deletedPost) {
      throw new Error('No se encontró el post.')
    }

    return deletedPost
  } catch (error: unknown) {
    console.error('Error al eliminar el post:', error)
    throw error
  }
}

export async function getPostByUserIdService(userId: string) {
  try {
    const postList = await PostModel.find({ idUser: userId })
    return postList
  } catch (error: unknown) {
    throw new Error('Error de busqueda por id')
  }
}
