import express from 'express'
import { getAllUser, isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from '../controllers/authController.js';
import {Auth,verifyToken} from '../middleware/userAuth.js';

export const authRouter = express.Router();

authRouter.post('/register',register)//executed controller register function
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.post('/send-verify-otp',Auth,sendVerifyOtp)
authRouter.post('/verfiy-account',Auth,verifyEmail)
authRouter.post('/is-auth',Auth,isAuthenticated)
authRouter.post('/send-reset-otp',sendResetOtp)
authRouter.post('/reset-password',resetPassword)
authRouter.get('/get-all-users', getAllUser)

//RBAC
//Only educator can access the route
authRouter.get("/educator",verifyToken,(req,res)=>{
    res.json({message:"Welcome Educator"});
})
//Both educator and student can access the route
authRouter.get("/student",(req,res)=>{
    res.json({message:"Welcome Student"});
})




