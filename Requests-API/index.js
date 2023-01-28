import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT || 5000;


const app = express();

app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

//DB connection  

mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log(`DB Connected`);
})

// import studentModel from "./models/studentModel.js";
// import facultyModel from "./models/facultyModel.js";

// let user = new studentModel({
//     name : "Dharun",
//     rollNo : 10,
// });

// await user.save();


// let faculty = new facultyModel({
//     name:"Rathi"
// });

// await faculty.save();



import studentRouter from './routes/studentRoute.js';

app.use('/student',studentRouter);


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})