const express = require("express")

const app = express();

const mongoose = require("mongoose");

async function connectDB(){
  await mongoose.connect("mongodb+srv://Ansh:WeMQCTwISxFwugOG@cluster0.1mnk4tf.mongodb.net/project-1");
  console.log("connected to DB");
}
connectDB();

module.exports = app;