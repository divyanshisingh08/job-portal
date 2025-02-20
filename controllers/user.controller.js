const express=require("express");
const User = require("../models/user.model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const cookie=require("cookie-parser")
const _ = require("lodash");




const register=async(req,res)=>{
    try {

       const {fullName,email,phoneNumber,password,role}=req.body;
       if (!fullName || !phoneNumber || !email || !password || !role){
        throw new Error("Please fill all the details")
       }

       const user= await User.findOne({email});

       if(user){
        throw new Error("User already exists")
       }


       const hashedPassword= await bcrypt.hash(password,10);

       await User.create({
        fullName,
        email,
        password:hashedPassword,
        phoneNumber,
        role,
       })
       
       return res.status(201).json({
        message : "Account Created Successfully",
        success:true
       })
    } catch (error) {
        res.status(400).send("Something went wrong "+ error.message)
        
    }

    
}


const login=async(req,res)=>{
    try {
        const {email,password,role}=req.body;

    let user=await User.findOne({email})

    if(!user){
        throw new Error("User Does not exist");
    }

    const isPasswordValid= await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        throw new Error("Invalid Credentials")
    }

    if(role != user.role){
        throw new Error("Account Does not exist with current role");

    }



    const tokenData={
        userId:user._id,
        fullName : user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile
    };



const token =await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
    message:`Welcome ${user.fullName}`,
    successs:true
})



    
    } catch (error) {
        res.status(400).send("Something went wrong" + error.message)
        
    }
}

const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message : "Logged Out Successfully",
            success:true
        })
        
    } catch (error) {
        res.status(400).send("Something went wrong "+ error.message)

    }
}


const updateProfile=async(req,res)=>{
        try {
             const userId=req.id;  //middleware authentication
               
             const { fullName, phoneNumber, email, profile } = req.body;

            let updateData = {};

            // Update top-level fields if provided
            if (fullName) updateData.fullName = fullName;
            if (phoneNumber) updateData.phoneNumber = phoneNumber;
            if (email) updateData.email = email;
                
               // Ensure profile updates are applied correctly
               if (profile) {
                 for (const key in profile) {
                   updateData[`profile.${key}`] = profile[key];
                 }
               }
           
               // Update user in DB
               const user = await User.findByIdAndUpdate(
                 userId,
                 { $set: updateData },
                 { new: true, runValidators: true }
               );
          
              if (!user) {
                throw new Error("User not Found");
              }
          
               
                //   const skillsArray=skills.split(",");
//Loop through all the fields and update each with the coming data
            await user.save();

            console.log(user)

// user={
//     _id:user._id,
//     fullName : user.fullName,
//     email:user.email,
//     phoneNumber:user.phoneNumber,
//     role:user.role,
//     profile:user.profile
// }

return res.status(200).json({
    message: "Profile Updated Successfully",
    user,
    success:true,
})

                
        } catch (error) {
            res.status(400).send("Something went wrong "+ error.message)

        }

    
    

    

    

}


module.exports={login,register,updateProfile,logout}