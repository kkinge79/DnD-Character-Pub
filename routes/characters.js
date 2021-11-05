import { Router } from 'express'
import * as charactersCtrl from '../controllers/characters.js'
const router = Router()

router.get('/new', charactersCtrl.new)

export {
  router
}