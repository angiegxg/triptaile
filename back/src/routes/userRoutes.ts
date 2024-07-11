import express from 'express'
import * as userController from '../controllers/userController'
import checkToken from '../middlewares/authMiddleware'
const userRoutes = express.Router()

userRoutes.post('/newuser', userController.createUserController)
userRoutes.get('/getuserbytoken', checkToken, userController.getUserByToken)
userRoutes.get('/', checkToken, userController.getAllUserController)
userRoutes.put('/', checkToken, userController.editUserController)
userRoutes.get('/:id', checkToken, userController.findUserById)
userRoutes.delete('/:id', checkToken, userController.deleteUserController)
userRoutes.post('/login', userController.checkUserController)

export default userRoutes
