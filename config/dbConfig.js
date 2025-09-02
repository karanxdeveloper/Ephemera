import mongoose  from "mongoose";
import Post from "../models/postModels.js";

const connectDB = async ()=>{
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to Database");
        await Post.syncIndexes();
        console.log("Indexes synced ✅")
        
    } catch (error) {
        console.log("Not able to connect with database", error);
        
    }
}

export default connectDB;