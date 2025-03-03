import {userModel} from '../models/user.model.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import createToken from '../jwt/token.jwt.js'
import jwt from 'jsonwebtoken'

//register
export const register = async (req, res) => {

     try {
        
        const {name, email, password} = req.body

        //checking user has already register
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({
                success: false,
                message:"User already exists"
            })
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message:"Please enter a valid email"
            })
        }
        
        if(password.length < 8){
            return res.json({
                success: false,
                message:"Please enter a strong password"
            })
        }

        //password convert in not reading human format
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({
            success:true,
            token
        })

     } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in register"
        })
     }

}

//login
export const login = async (req, res) => {

    try {
        
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        //check the user not exist 
        if(!user){
            return res.json({
                success: false,
                message: "User doesn't exists"
            })
        }

        //database password and user-login-password equl 
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.json({
                success: true,
                token
            })
        } else {
            return res.json({
                success: false,
                message: "Password is wrong"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in login"
        })
    }

}

//admin login
export const adminLogin = async (req, res) => {

    try {
        
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        }
        else {
            res.json({
                success: false,
                message: "Invalid credentials"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in adminLogin"
        })
    }

}