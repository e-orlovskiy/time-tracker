import { Router } from 'express'
import { addTask, deleteTask, updateTask } from '../controllers/taskController'
import { loginUser, registerUser } from '../controllers/userController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

// user router
router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)

// tasks router
router.post('/tasks/addTask', authMiddleware, addTask)
router.delete('/tasks/deleteTask', authMiddleware, deleteTask)
router.put('/tasks/updateTask', authMiddleware, updateTask)

export default router
