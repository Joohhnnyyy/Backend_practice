  const express = require("express")
  const authRouter = express.Router()
  const jwt = require("jsonwebtoken")
  const userModel = require("../models/user.model")


  authRouter.post("/register" , async (req,res)=>{

    const {name ,email,password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
      return res.status(409).json({
        message:"user Already Exist with this email"
      })
    }
    const user = await userModel.create({
      name,email,password
    })

    const token = jwt.sign({
      id:user._id,
      email:user.email
    },
    process.env.JWT_SECRET)

    res.cookie("jwt_token",token)

    res.status(201).json({
      message:"user registered",
      user,
      token
    })
  })

  module.exports = authRouter