const express=require("express");
const {login, register, updateProfile,logout}= require("../controllers/user.controller");
const isAuthenticated  = require("../middlewares/isAuthenticated");
const router= express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").patch(isAuthenticated,updateProfile);
router.route("/logout").post(logout);


module.exports= 
  router  
