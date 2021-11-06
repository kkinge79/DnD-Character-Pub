import { Router } from 'express'
import * as charactersCtrl from '../controllers/characters.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', charactersCtrl.index)

router.get('/new', charactersCtrl.new)

router.post('/', isLoggedIn, charactersCtrl.create)


export {
  router
}