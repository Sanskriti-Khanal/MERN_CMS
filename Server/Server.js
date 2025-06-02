import express from "express";
import cors from "cors";
// import 'dotenv/config'
import cookieParser from "cookie-parser";
import {connectDB} from './Config/mongodb.js'
import authRouter from './routes/authRoutes.js'
import dotenv from "dotenv"

import userRouter from "./routes/userRoutes.js";
dotenv.config()

const app = express();
const port = process.env.PORT || 4000
connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}))

//APT Endpoints
app.get('/',(req,res)=>res.send("API Working fine"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter) // ✅ Fixed path



app.listen(port,()=>console.log(`Server started on PORT:${port}`))
