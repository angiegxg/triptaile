import express from 'express'
import * as postController from '../controllers/postController'
import checkToken from '../middlewares/authMiddleware'

const postRoutes = express.Router()

postRoutes.get('/', postController.getAllUserController)
postRoutes.post('/', checkToken, postController.createPostController)
postRoutes.put('/', checkToken, postController.editPostController)
postRoutes.delete('/:id', checkToken, postController.deletePostController)
postRoutes.get('/:id', checkToken, postController.getPostByIdController)
postRoutes.get('/user/:id', checkToken, postController.getPostByIdUserController)

export default postRoutes
