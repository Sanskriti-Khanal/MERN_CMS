import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../Config/nodemailer.js'

export const register = async(req,res)=>{
    const{name,email,password,role}=req.body;
    if(!name || !email || !password){
        return res.json({success:false,
            message:"Missing Details"
        })

    }

    try{
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new userModel({name,email,password:hashedPassword,role});//from request body
        await user.save();//saving data to datbase

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 
        'none': 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000// expiry time
        });
         //sending welcome email
         const mailOptions = {
            from :'consciousanskriti@gmail.com',
            to:email,
            subject :'Welcome to Stack-Security',
            text:`Welcome to Stack-Security website.Your account has been 
            created with email id:${email}`
         }
         await transporter.sendMail(mailOptions);

        return res.json({success:true});
        
    }catch(error){
        res.json({success:false,message:error.message})
    }

}





export const login = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.json({success:false, message:'Email and Password are required'})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:'Invalid email'})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:'Invalid Password'})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 
        'none': 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000// expiry time
        })
        return res.json({success:true});

    }catch(error){
        return res.json({success:false, message: error.message})

    }

}

export const logout = async(req,res)=>{
    
    try{
        res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:process.env.NODE_ENV === 'production' ? 
        'none': 'strict',
        })
        return res.json({success:true,message:"Logged Out"})

    }catch(error){
        return res.json({success:false,message:error.message});
    }
    
}

//Send Verification OTP to the user's Email
export const sendVerifyOtp= async(req,res)=>{
    try{
        const{userId}=req.body;

        const user =  await userModel.findById(userId)
        if(user.isAccountVerified){
            return res.json({success:false,message:"Account already verified"});
        }
       const otp =String(Math.floor(100000 + Math.random()*900000));
       user.verifyotp = otp;
       user.verifyotpExpiredAt= Date.now() +24*60*60*1000
       await user.save();

       const mailOption = {
        from :'consciousanskriti@gmail.com',
        to:user.email,
        subject :'Account Verification OTP',
        text:`Your OTP is ${otp}.Verify your account useing OTP`
       }
       await transporter.sendMail(mailOption);
       res.json({success:true,message:"Verification OTP sent on Email"});
       

    }catch(error){
        return res.json({success:false,message:error.message});
    }
}

export const  verifyEmail = async(req,res)=>{
    const {userID,otp} = req.body;
    if (!userID || !otp){
        return res.json({success:false,message:"Missing details"});
    }
    try{

        const user =  await userModel.findById(userID);
        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        if(user.verifyotp === "" || user.verifyotp !== otp){
            return res.json({success:false,message:"Invalid OTP"});
            
        }

        if(user.verifyotpExpiredAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"});
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyotpExpiredAt=0;

        await user.save();
        return res.json({success:true,message:"Email Verified Successfully"})
    }catch(error){
        return res.json({success:false,message:error.message});

    }

}

//Check if user is authenticated
export const isAuthenticated =  async(req,res)=>{
    try {
        return res.json({success:true});
        
    } catch (error) {
        res.json({success:false,message:error.message});

    }
 
}

//Send Password Reset OTP
export const sendResetOtp = async(req,res)=>{
    const{email}=req.body;
    if (!email) {
        return res.json({success:false,message:"Email is required"}) 
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"})
        }

        const otp =String(Math.floor(100000 + Math.random()*900000));
       user.resetOtp = otp;
       user.resetotpExpiredAt= Date.now() +15 * 60 * 1000
       await user.save();

       const mailOption = {
        from :'consciousanskriti@gmail.com',
        to:user.email,
        subject :'Password Reset OTP',
        text:`Your OTP for resetting your password is ${otp}.Use this OTP to proceed with resetting your password.`
       };
       await transporter.sendMail(mailOption);
       res.json({success:true,message:"OTP sent to your Email"});
        
    } catch (error) {
        return res.json({success:false,message:error.message}) ;
    }

}

//Reset User Password
export const resetPassword = async (req, res) => {
    const { email, otp, newpassword } = req.body;
    
    if (!email || !otp || !newPassword) {
        return res.json({ success:false,message: "All fields are required: email, otp, newpassword." });
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({ success:false,message:"User not found" });
        }
        if (user.resetOtp === "" || user.resetOtp !==otp) {
            return res.json({ success:false,message:"Invalid OTP" });
        }
        if (user.resetotpExpiredAt < Date.now()) {
            return res.json({ success:false,message:"OTP Expired" });       
        }
        const hashedPassword =  await bcrypt.hash(newpassword,10);
        user.password = hashedPassword;
        user.resetOtp="";
        user.resetotpExpiredAt = 0;
        await user.save();
        return res.json({ success:true,message: "Password has been changed successfully!"})

    } catch (error) {
        return res.json({ success:false,message: error.message });
    }

    
};

export const getAllUser = async (req, res) =>{
    const user = await userModel.find().select("-password")

    if(user){
        res.json(user)
    }else{
        res.status(404).json({success: false, message: "Users not found"})
    }
}
