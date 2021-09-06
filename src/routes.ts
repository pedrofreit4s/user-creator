import { Router } from 'express'
import { UserController } from './controllers/UserController'

const routes = Router()

const userController = new UserController()

routes.get('/users', userController.getAllUsers)
routes.get('/users/:id', userController.getUserById)
routes.delete('/users/:id', userController.deleteUserById)
routes.put('/users/:id', userController.editUserById)
routes.post('/users', userController.createUser)

export { routes }
