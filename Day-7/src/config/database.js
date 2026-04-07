const mongoose = require("mongoose")
function connectDB(){
  mongoose.connect(process.env.MONOGO_URI)
  .then(() =>{
    console.log("connect to DB")
  })
}
module.exports = connectDB