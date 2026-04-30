const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  caption:{
    type:String,
    default:""
  },
  imgUrl:{
    type:String,
    required:[true,"imgUrl is required for creating an post"]
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required:[true ," User ID is required for the creation of post"],
    ref:"users"
  }

})

const postModel = mongoose.model("posts" ,postSchema)
module.exports = postModel;