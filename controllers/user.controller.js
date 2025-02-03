const express=require("express");
const User = require("../models/user.model");


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
       
    } catch (error) {
        res.status(400).send("Something went wrong "+ error.message)
        
    }
}