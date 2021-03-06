import { Router } from 'express'
import * as charactersCtrl from '../controllers/characters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, charactersCtrl.index)

router.get('/new', isLoggedIn, charactersCtrl.new)

router.post('/', isLoggedIn, charactersCtrl.create)

router.post("/:id/comments", isLoggedIn, charactersCtrl.createComment)

router.get('/:id', charactersCtrl.show)

router.get("/:id/edit", isLoggedIn, charactersCtrl.edit)

router.put('/:id', isLoggedIn, charactersCtrl.update)

router.delete("/:id", isLoggedIn , charactersCtrl.delete)




export {
  router
}