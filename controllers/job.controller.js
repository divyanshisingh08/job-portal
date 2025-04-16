const postJob= async (req,res)=>{
try {

    const {title, companyName,description,requirement, experience ,salary,location,companyId}=req.body;
    const userId=req.id;

    if(!title || !description || !requirement || !experience || !salary || !location || !companyId){
        return res.status(400).json({
            message: " Something is missing",
            success:false
        })
    }
    
} catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });

}
}