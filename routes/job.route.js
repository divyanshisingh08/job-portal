const express=require("express");
const isAuthenticated  = require("../middlewares/isAuthenticated");
const router= express.Router();
const {postJob,getAllJobs,getJobById,getAdminJobs}=require("../controllers/job.controller")


router.route("/new").post(isAuthenticated,postJob);
router.route("/list").get(isAuthenticated,getAllJobs);
router.route("/:id").get(isAuthenticated,getJobById);
router.route("/admin/list").get(isAuthenticated,getAdminJobs);


module.exports=router