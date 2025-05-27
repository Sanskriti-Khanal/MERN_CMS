import express from 'express'
import { isAuthenticated, login, logout, register, sendVerifyOtp, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register',register)//executed controller register function
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp)
authRouter.post('/verfiy-account',userAuth,verifyEmail)
authRouter.post('/is-auth',userAuth,isAuthenticated)



export default authRouter;