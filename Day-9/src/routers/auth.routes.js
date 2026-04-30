const express = require("express");
const userModel = require("../model/user.model");
const crypto  = require("crypto")
const jwt = require("jsonwebtoken")
const authRouter = express.Router();

authRouter.post("/register",async(req,res) =>{
  const {name ,email ,password} = req.body;
  const isUserExist = await userModel.findOne({email})
  if(!isUserExist){
    return res.status(409).json({
      message:"User Alredy exist"
    })
  }
  const user = await userModel.create({
    name,
    email,
    password:crypto.createHash('sha256').update(password).digest('hex')

  })
  const token = jwt.sign({
    id: user._id,
  },process.env.JWT_SECRET,{expiresIn:"2h"})
  res.cookie("token",token)
  res.status(201).json({
    message:"User Register Succesfully",
    user:{
      name:user.name,
      email:user.email,
      password:user.password
    }
  })
})

module.exports = authRouter;