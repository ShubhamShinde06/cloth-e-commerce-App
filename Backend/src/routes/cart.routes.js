import {Router} from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controllers.js'
import authUser from '../middlewares/auth.js'

const router = Router()

router.post('/add', authUser, addToCart)
router.post('/update', authUser, updateCart)
router.post('/get', authUser, getUserCart)

export default router