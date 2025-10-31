// server/route/contactRoute.js
import express from 'express'
import * as contactCtrl from '../controller/contactController.js'  // <-- use namespace import

const router = express.Router()

console.log('contactRoute loaded') // helpful for debugging

router.route('/')
  .get(contactCtrl.getAll)
  .post(contactCtrl.create)
  .delete(contactCtrl.removeAll)

router.route('/:id')
  .get(contactCtrl.getById)
  .put(contactCtrl.update)
  .delete(contactCtrl.remove)

export default router
