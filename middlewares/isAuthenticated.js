const jwt=require("jsonwebtoken")

const isAuthenticated=async(req,res,next)=>{
    try {
        const token =req.cookies.token;
        console.log(token)
        if(!token){
            throw new Error("User Not Authenticated")
        }


         // Validate the token
    const decodedMessage= await jwt.verify(token,process.env.SECRET_KEY);
    console.log("HHHHHHHHHHHHHHHHHH", decodedMessage)

    // Find the username
   req.id= decodedMessage.userId;

   console.log(req.id)
     next()


    } catch (error) {
        res.status(400).send("Something went wrong " + error);
        
    }
}


module.exports= isAuthenticated