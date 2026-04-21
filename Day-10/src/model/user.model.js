const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    email:[true,"Username Already exist"],
    required:[true,"Username is required"]
  },
  email:{
    type:String,
    unique:[true,"Email Already Exist"],
    required:[true,"Email is required"]
  },
  password:{
    type:String,
    required:[true,"Password is required"]
  },
  bio:String,
  profileImage:{
    type:String,
    default:"https://ik.imagekit.io/c0h1max8p/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.avif"
  }
})


const userModel = mongoose.model("users",userSchema)

module.exports = userModel;