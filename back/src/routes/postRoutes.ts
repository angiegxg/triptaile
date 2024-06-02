import express from 'express'
import * as postController from '../controllers/postController'
import multerUpload from '../config/multerConfig'
// import checkToken from '../middlewares/authMiddleware'

const postRoutes = express.Router()

postRoutes.get('/', postController.getAllUserController)
postRoutes.post('/newpost', multerUpload.single('file'), postController.createPostController)
postRoutes.put('/editpost', postController.editPostController)
postRoutes.delete('/deletepost/:id', postController.deletePostController)
postRoutes.get('/:id', postController.getPostByIdController)
postRoutes.get('/user/:id', postController.getPostByIdUserController)

export default postRoutes
