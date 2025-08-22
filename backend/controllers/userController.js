import bcrypt from "bcrypt"
import {userModel} from "../mongodb/model.js"
import jwt from 'jsonwebtoken'
import { connectDB } from "../mongodb/mongoConnection.js"
connectDB()

 
const getUserCoins = async (req, res) => {

    try {
        const { userId } = req
        const userData = await userModel.findById(userId)
        if (userData) {
            res.status(200).json({ success: true, coincount: userData.coincount, name:userData.name })
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Provide all details" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name, email, password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, userData })


    } catch (error) {
        res.json({ success: false, message: error })

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({ success: false, message: "all details required" })
        }

        const UserExist = await userModel.findOne({ email })

        if (!UserExist) {
            return res.status(400).json({ success: false, message: "User doesn not exist, please make new account" })
        }
        const isPasswordMatched = await bcrypt.compare(password, UserExist.password)
        if (!isPasswordMatched) {
            res.status(400).json({ success: false, message: "Password not correct" })
        }

        const loginToken = jwt.sign({ id: UserExist._id }, process.env.JWT_SECRET)
        res.status(200).json({ success: true,UserExist, loginToken, message: "Login Successfull !!!" })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export { getUserCoins, registerUser, loginUser }