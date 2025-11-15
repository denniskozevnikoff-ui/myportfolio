// server/route/authRoute.js
import express from 'express';
import { register, signin, signout, profile } from '../controller/authController.js';
//import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/signin', signin);
router.get('/signout', signout);
// router.get('/profile', verifyToken, profile);

export default router;
