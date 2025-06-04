import jwt  from "jsonwebtoken";

 export const Auth = async (req,res,next)=>{
    const{token} = req.cookies;

    if(!token){
        return res.json({success:false,message:"Not authorised Login Again"});
    }
    try{
        const tokenDecode=  jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({success:false,message:"Not authorised Login Again"});
        }

        next();


    }catch(error){
        return res.json({success:false,message:error.message});
    }

    

}
 export const verifyToken = async(req, res, next) =>{
    let token;
    let authHeader =  req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
    }
    if(!token){
        return res.json({success:false,message:"No token "});
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        console.log("The decoed user is:",req.user);
        next();
    } catch (error) {
        return res.json({success:false,message:"Token is not valid "});
        
    }
        

};


