import { configDotenv } from "dotenv";
import mongoose, { connect, mongo } from "mongoose";
configDotenv()
async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected : ${mongoose.connection.host}`);
  }catch(err){
    console.log("Error in connecting to DB" ,err)
  }
}
export default connectDB;
