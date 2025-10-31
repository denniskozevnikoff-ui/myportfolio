// server/route/userRoute.js
import express from 'express'
import * as userCtrl from '../controller/userController.js' // use namespace import

const router = express.Router()

console.log('userRoute loaded') // helpful for debugging

router.route('/')
  .get(userCtrl.getAll)
  .post(userCtrl.create)
  .delete(userCtrl.removeAll)

router.route('/:id')
  .get(userCtrl.getById)
  .put(userCtrl.update)
  .delete(userCtrl.remove)

export default router
