const express=require("express");
const User = require("../models/user.model");
const bcrypt=require("bcryptjs")



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

       await User.save({
        fullName,
        email,
        password:hashedPassword,
        phoneNumber,
        role,
       })
       
    } catch (error) {
        res.status(400).send("Something went wrong "+ error.message)
        
    }

    
}


const login=async(req,res)=>{
    try {
        const {email,password,role}=req.body;

    const user=await User.findOne({email})

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
        userId:user._id
    };

const token =await jwt.sign()

    
    } catch (error) {
        
    }
}