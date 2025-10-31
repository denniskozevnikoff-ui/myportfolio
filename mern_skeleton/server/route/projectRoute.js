// server/route/projectRoute.js
import express from 'express'
import * as projectCtrl from '../controller/projectController.js' // use namespace import

const router = express.Router()

console.log('projectRoute loaded') // helpful for debugging

router.route('/')
  .get(projectCtrl.getAll)
  .post(projectCtrl.create)
  .delete(projectCtrl.removeAll)

router.route('/:id')
  .get(projectCtrl.getById)
  .put(projectCtrl.update)
  .delete(projectCtrl.remove)

export default router
