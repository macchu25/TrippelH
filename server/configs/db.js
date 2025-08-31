import mongoose from "mongoose";

const connectDB= async()=>{

    try {
        mongoose.connection.on('connected',()=>console.log("Database connected"));
        await mongoose.connect(`${process.env.MONGODB_URL}/pingup`);
    
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectDB;