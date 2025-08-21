import jwt from 'jsonwebtoken'


const adminAuth= async(req,res,next)=>{
    try {
       /* const{token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        const token_decode= jwt.verify(token,"greatstack", { expiresIn: '1900h' });

        if(token_decode!== "admin@forever.com"+"qwerty123"){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }*/
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    }

    export default adminAuth
