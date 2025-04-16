
const Job=require("../models/job.model")

const postJob= async (req,res)=>{
try {

    const {title,description,requirements, experience ,salary,location,companyId,jobType}=req.body;
    const userId = req.user._id;

    if(!title ||  !description || !requirements || !experience || !salary || !location  || !companyId){
        return res.status(400).json({
            message: " Something is missing ",
            success:false
        })
    }

    const job=await Job.create({
        title,
        description,  
        requirements: requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experience:experience,
        company:companyId,
        created_by:userId

    });



    return res.status(201).json({
        message:"New Job Created Successfully",
        job,
        success:true
    })
    
} catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });

}
}


const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
 const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"company"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
 const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user._id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports={postJob,getAllJobs,getJobById,getAdminJobs}