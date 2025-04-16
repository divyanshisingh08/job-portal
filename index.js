const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");
const userRouter = require("./routes/user.route");
const companyRouter=require("./routes/company.route")
const jobRouter=require("./routes/job.route")

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Hello");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", 
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database Connection Failed: " + err.message);
  });
