import {Router} from 'express'
import { adminLogin, login, register } from '../controllers/user.controllers.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/admin', adminLogin)

export default router