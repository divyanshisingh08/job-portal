const express=require("express");
const isAuthenticated  = require("../middlewares/isAuthenticated");
const router= express.Router();
const {registerCompany, getCompany,getCompanyById,updateCompany}=require("../controllers/company.controller")




router.route("/register/new").post(isAuthenticated,registerCompany)
router.route("/get/list").get(isAuthenticated,getCompany)
router.route("/get/:id").get(isAuthenticated,getCompanyById)
router.route("/update/:id").patch(isAuthenticated,updateCompany)




module.exports=router
