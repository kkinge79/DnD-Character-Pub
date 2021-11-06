import { Router } from 'express'
import * as charactersCtrl from '../controllers/characters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, charactersCtrl.index)

router.get('/new', isLoggedIn, charactersCtrl.new)

router.post('/', isLoggedIn, charactersCtrl.create)

router.get('/:id', charactersCtrl.show)

router.get("/:id/edit", charactersCtrl.edit)

// router.put('/:id', charactersCtrl.update)

router.delete("/:id", charactersCtrl.delete)




export {
  router
}