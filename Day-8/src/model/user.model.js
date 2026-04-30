const mongoose = require('mongoose')

const userSchemea = new mongoose.Schema({
  name:String,
  email:{
    type:String,
    unique:[true,"Email already exist"]
  },
  password:String
})


const userModel = mongoose.model("user",userSchemea);
module.exports = userModel;
