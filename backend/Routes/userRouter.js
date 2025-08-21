import express from 'express'
import { getUserCoins, registerUser, loginUser } from '../controllers/userController.js'
import { getUserIdmware } from "../middleWares/userIdmware.js"

const userRouter = express.Router()

userRouter.post('/regiterUser', registerUser)
userRouter.post('/loginUser', loginUser)
userRouter.get('/getUserCoins', getUserIdmware, getUserCoins)

export default userRouter