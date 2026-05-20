import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
dotenv.config();
const app=express()
app.use(cors({
  origin: '*'
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  


.then(()=> console.log("mongodb connected successfully"))
.catch((err)=> console.log("error:",err));
app.use('/api/students', studentRoutes);

 
app.get("/", (req,res)=>{
    res.send("student mark system api ready")})

app.listen(process.env.PORT || 5000, () => {
  console.log('server running!')
});


