import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


export const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(connectionInstance.connections[0]._connectionString);
    } catch (error) {
        console.log("Error connecting to MongoDB",error);
         process.exit(1);
    }
}