  const express = require("express")
  const authRouter = express.Router()
  const jwt = require("jsonwebtoken")
  const userModel = require("../models/user.model")
  const crypto = require("crypto")


  authRouter.post("/register" , async (req,res)=>{

    const {name ,email,password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})
    if(isUserAlreadyExist){
      return res.status(409).json({
        message:"user Already Exist with this email"
      })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
      name,email,password:hash
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

  authRouter.post("/cookie",(req,res)=>{
    console.log(req.cookies)
    res.status(200).json({
      message:"this is jwt"
    })
  })


  authRouter.post("/login", async (req,res) =>{
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).json({
        messge:"user not found with the email"
      })
    }
    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")
    if(!isPasswordMatch){
      return res.status(401).json({
        message:"Password is incorrect"
      })
    }

    const token = jwt.sign({
      id: user._id,
      email:user.email
    },process.env.JWT_SECRET)

    res.cookie("jwt_toek",token)

    res.status(200).json({
      message:"user Logged in successfully",
      user,
      token
    })
    
  })

  module.exports = authRouter