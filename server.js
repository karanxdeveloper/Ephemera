import express from "express"
import cors from "cors"
import "dotenv/config";
import connectDB from "./config/dbConfig.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import cookieParser from 'cookie-parser';


const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));



app.get('/api/status',(req,res)=>res.send("api is live"))
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)

connectDB()
app.listen(port,()=>{
    console.log("server is live on port ",port)
})
