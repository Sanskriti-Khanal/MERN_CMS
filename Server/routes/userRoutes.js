import express from 'express'
import verifyToken from '../middleware/userAuth.js';

const userRouter = express.Router();

//Only educator can access the route
userRouter.get("/educator",verifyToken,(req,res)=>{
    res.json({message:"Welcome Educator"});
})
//Both educator and student can access the route
userRouter.get("/student",(req,res)=>{
    res.json({message:"Welcome Student"});
})




export default userRouter;