const isAuthenticated=async(req,res,next)=>{
    try {
        const token =req.cookies.token;
        if(!token){
            throw new Error("User Not Authenticated")
        }


         // Validate the token
    const decodedMessage= await jwt.verify(token,process.env.SECRET_KEY);
    // Find the username
   req.id= decodedMessage.userId;
     next()


    } catch (error) {
        res.status(400).send("Something went wrong" + error);
        
    }
}


module.exports= {isAuthenticated}