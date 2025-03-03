import { Router } from "express";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/product.controllers.js";
import upload from "../middlewares/multer.middlewares.js";
import { adminAuth } from "../middlewares/adminAuth.middlewares.js";

const router = Router()

router.post('/add', adminAuth, upload.fields([{name: 'image1', maxCount:1}, {name: 'image2', maxCount:1}, {name: 'image3', maxCount:1}, {name: 'image4', maxCount:1}]), addProduct)
router.get('/list', listProducts)
router.post('/remove', adminAuth, removeProduct)
router.post('/single', singleProduct)

export default router