const express=require("express");
const isAuthenticated  = require("../middlewares/isAuthenticated");
const router= express.Router();
const { applyJob,getAppliedJob,getApplicants,updateStatus}=require("../controllers/application.controller")


router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/applied/list").get(isAuthenticated,getAppliedJob);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id").post(isAuthenticated,updateStatus);

module.exports=router
