import {orderModel} from '../models/order.models.js'
import {userModel} from '../models/user.model.js'
import Stripe from 'stripe'

//getway stripe initialize
const stripe = new Stripe("sk_test_51QGdpTCvK0uWWnjPx4eWsK1GJf2RPFFVHwvQSkkYKKS3ueWuGxEAeqmPqRQV6qxDV0esEmo1MZpA13f4c8pLJMzp003L491CBY")

//global varibales
const currency = 'inr'
const deliveryCharge = 100



// COD use 
export const placeOrder = async (req, res) => {

    try {
        
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({
            success: true,
            message: "Order Placed"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in placeOrder"
        })
    }

}

// Stripe use 
export const placeOrderStripe = async (req, res) => {
    
    try {
        
        const {userId, items, amount, address} = req.body;
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data:{
                currency: currency,
                product_data: {
                    name:item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: currency,
                product_data: {
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({
            success: true,
            session_url: session.url
        })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in placeOrderStripe"
        })
    }
}

//verify stripe
export const verifyStripe = async (req,res) => {
    
    const {orderId, success, userId} = req.body

    try {
        
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})

            res.json({
                success:true
            })
        } 
        else {
            await orderModel.findByIdAndUpdate(orderId)
            res.json({
                success: false
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in verifyStripe"
        })
    }
    
}

//Razorpay use
export const placeOrderRazorpay = async (req, res) => {

}

//all orders data for admin panle
export const allOrders = async (req, res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({
            success: true,
            orders
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in allOrders"
        })
    }

}

//user myorders data
export const userOrders = async (req, res) => {

    try {
        
        const {userId} =  req.body

        const orders = await orderModel.find({userId})

        res.json({
            success:true,
            orders
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in userOrders"
        })
    }

}

//status change from admin panel
export const updateStatus = async (req, res) => {

    try {
        
        const {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})

        res.json({
            success: true,
            message: "Status Updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in updateStatus"
        })
    }

}