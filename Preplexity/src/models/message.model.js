import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
  chat:{
    type:mongoose.Schema.Types.
    ObjectId,
    ref:'Chat',
    required: true
  },
  content:{
    type:String,
    enum:{
      values:[user , ai],
      message :"This is Enum values"
    }
  }
})

const messageModel = mongoose.model("Message" , messageSchema)

export default messageModel;