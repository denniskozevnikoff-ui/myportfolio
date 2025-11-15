import express from 'express';
import * as userCtrl from '../controller/userController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(verifyToken, isAdmin, userCtrl.getAll)    // only admin can list users
  .post(verifyToken, isAdmin, userCtrl.create)
  .delete(verifyToken, isAdmin, userCtrl.removeAll);

// individual operations could be protected depending on your strategy
router.route('/:id')
  .get(verifyToken, userCtrl.getById) // users can fetch user profile if permitted
  .put(verifyToken, isAdmin, userCtrl.update)
  .delete(verifyToken, isAdmin, userCtrl.remove);

export default router;
