import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifyotp:{type:String,default:''},
    verifyotpExpiredAt:{type:Number,default:0},
    isAccountVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetotpExpiredAt:{type:Number,default:0},
    role:{type:String,required:true,enum:["educator","student"]}

})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;

