const Company = require("../models/company.model");

const registerCompany = async (req, res) => {
    try {
        const { name, description, location, logo, website } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(400).json({ message: "Company already exists" });
        }

        const company = new Company({
            name,
            description,
            location,
            logo,
            website,
            userId:req.id
        });

        await company.save();  

        return res.status(201).json({ message: "Company added successfully", company });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong ", error: error.message });
    }
};


const getCompany=async(req,res)=>{
   try{ 




    
    const userId=req.id;
    console.log("This is user",userId)




    const companies=await Company.find({userId})

    console.log(companies);

    res.status(200).json({
        companies,
        message:"Companies Registered by you",
       success:true,
    })
}
catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
}
}


//GET Company by ID

const getCompanyById=async (req,res)=>{
    try{
        const companyId= req.params.id;


        const company=await Company.findById(companyId);

        if(!company){
            return res.status(404).json({
                message:"Company Not Found",
                success:false

            })
        }


        return res.status(200).json({
            company,
            success:true
        })

    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}


const updateCompany=async(req,res)=>{

    try{

       const {name,description,location,website}=req.body;
       
       const updateData={name,description,location,website}

       const company = await Company.findById(req.params.id);

       if(!company) {
        return res.status(404).json({
            message:"Company Not Found"
        })
       }

       if (company.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "You are not authorized to update this company.",
            success: false,
        });
    }

       const updatedCompany= await Company.findByIdAndUpdate(req.params.id, updateData);

      

       return res.status(200).json({
        company: updatedCompany,
        message:"Company Information Updated",
        success:true
       })

    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}






module.exports={registerCompany,getCompany,getCompanyById,updateCompany};