const express=require("express")
const cookieParser =require("cookie-parser")
const cors=require("cors")

const app=express();

app.get("/",(req,res)=>{
    console.log("Hello")
    res.send("Hello")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); 

const corsOptions={
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

const PORT=3000;

app.listen(3000, ()=>{
    console.log(`Server is listening on PORT ${PORT}`)
})

