const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    email:[true,"User Already Exist with Email"],
    required:[true,"Username is required"],
    unique:[true,"Username Already Exist"]
  },
  email:{
    type:String,
    unique:[true,"Email Already Exist"],
    required:[true,"Email is required"]
  },
  password:{
    type:String,
    required:[true,"Password is required"],
    select: false
  }
},{timestamps:true})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;