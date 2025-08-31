import mongoose  from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected to Database");
        
    } catch (error) {
        console.log("Not able to connect with database", error);
        
    }
}

export default connectDB;