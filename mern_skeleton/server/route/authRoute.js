import express from 'express'
import { register, login, logout, profile } from '../controller/authController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', verifyToken, profile) 

export default router
