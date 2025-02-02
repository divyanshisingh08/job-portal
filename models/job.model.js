const mongoose=require("mongoose");

const jobSchema= new mongoose.Schema({

    title:{
        type:String,
        require:true,
    },

    description:{
        type:String,
        require:true,
    },

    requirements:{
        type:String,
        require:true,
    },

    salary:{
        type:Number,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    
    jobType:{
        type:String,
        require:true,
    },

    numberOfPosition:{
        type:Number,
        require:true,

    },
   company:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Company'
    },

    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Application"
        },
    ]
})


module.exports=mongoose.model("Job",jobSchema)