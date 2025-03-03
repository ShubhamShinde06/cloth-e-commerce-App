import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

import userRoter from './routes/user.routes.js'
app.use("/api/auth", userRoter)

import productRouter from './routes/product.routes.js'
app.use("/api/product", productRouter)

import cartRouter from './routes/cart.routes.js'
app.use("/api/cart", cartRouter)

import orderRouter from './routes/order.routes.js'
app.use("/api/order", orderRouter)

export default app