const mongoose = require("mongoose")

async function connectDB(){
  await mongoose.connect(process.env.MONGO_URI)
  console.log("conenct to DB");
}

connectDB();

module.exports = connectDB;