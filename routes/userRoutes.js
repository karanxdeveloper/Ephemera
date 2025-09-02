import express from "express"
import { login, logout, register } from "../controller/userController.js"

const userRouter = express.Router()


userRouter.post('/register', register)
userRouter.post('/login',login)
userRouter.post('/logout',logout)
// userRouter.post('/verifyMailOtp', verifyMailOtp)






export default userRouter