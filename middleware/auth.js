import jwt from "jsonwebtoken"


export const CheckUser = async (req,res,next)=>{
    console.log("checking", req.body)
    try {
        const {token} = req.cookies;

        if(!token){
            return res.json({success:false,message:"Not authorized"})
        }

        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(tokenDecode)

        if(tokenDecode.id){
            req.user = tokenDecode.id
        }else{
            return res.json({success:false,message:"Not authroized"})
        }

        next()

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}