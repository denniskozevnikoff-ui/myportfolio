// server/route/educationRoute.js
import express from 'express'
import * as educationCtrl from '../controller/educationController.js' // renamed

const router = express.Router()

console.log('educationRoute loaded') // helpful for debugging

router.route('/')
  .get(educationCtrl.getAll)
  .post(educationCtrl.create)
  .delete(educationCtrl.removeAll)

router.route('/:id')
  .get(educationCtrl.getById)
  .put(educationCtrl.update)
  .delete(educationCtrl.remove)

export default router
