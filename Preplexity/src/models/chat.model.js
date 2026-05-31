import mongoose, { mongo }  from "mongoose";

//Schema Formation 
const chatSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.
    ObjectId,
    ref:"User",
    required:true
  },
  title:{
    type:String,
    default :"New Chat",
    required:true
  },
})


const chatModel = mongoose.model("Chat" , chatSchema);

export default chatModel;