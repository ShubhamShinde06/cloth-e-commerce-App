import { Router } from "express";
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyStripe } from "../controllers/order.controllers.js";
import {adminAuth} from '../middlewares/adminAuth.middlewares.js'
import authUser from '../middlewares/auth.js'

const router = Router()

//admin
router.post('/list', adminAuth, allOrders)
router.post('/status', adminAuth, updateStatus)

//payment
router.post('/place', authUser, placeOrder)
router.post('/stripe', authUser, placeOrderStripe)
router.post('/razorpay', authUser, placeOrderRazorpay)

//user
router.post('/userorders', authUser, userOrders)

//veridy payment
router.post('/verifyStripe', authUser, verifyStripe)

export default router