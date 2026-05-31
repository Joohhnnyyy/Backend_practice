const userModel = require("../models/users.auth")
const blackListModel = require("../models/blacklist.model")
const authMiddleware = require("../middlewares/auth.middleware")
const redis = require("../config/cache")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { errorHandler } = require("../middlewares/errorHandler.middleware")
const { asyncHandler } = require("../middlewares/asyncHandler.middleware")

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
}

async function registerController(req,res,next){
  try{
    const {username , email, password } = req.body;

    if(!username || !email || !password){
      const error = new Error("All fields are required")
      error.statusCode = 400
      throw error
    }

    const isUserAlreadyExist = await userModel.findOne({
      $or:[
        {username},
        {email}
      ]
    })
    

    if (isUserAlreadyExist) {
      if (isUserAlreadyExist.email === email) {
        const error = new Error("Email already exists")
        error.statusCode = 409
        throw error
      }
      
      else {
        const error = new Error("Username already exists")
        error.statusCode = 409
        throw error
      }
    }


    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
      username,
      email,
      password:hash
    })

    const token = jwt.sign({
      id:user._id,
      username:user.username
    },process.env.JWT_SECRET,{
      expiresIn:"3d"
    })

    res.cookie("token",token,cookieOptions)

    res.status(201).json({
      message:"Regestration Successfull",
      username:user.username,
      email:user.email
    })
  }catch(err){
    console.error(err);
    next(err)
  }
}

async function loginController(req,res,next){
try
{  
const {email,password ,username} = req.body;

  if(!email || !password){
    const error = new Error("All fields are required")
    error.statusCode = 400
    throw error
  }

  const user = await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  }).select("+password")
  if(!user){
    const error = new Error("Invalid Credentials")
    error.statusCode = 404
    throw error
  }
const isPasswordMatch = await bcrypt.compare(password,user.password)
  if(!isPasswordMatch){
    const error = new Error("Invalid Credentials")
    error.statusCode = 404
    throw error
    }
const token = jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET,
  {
      expiresIn:"3d"
  })
  res.cookie("token",token,cookieOptions)
  res.status(200).json({
    message:"Login Successfull",
    username:user.username,
    email:user.email
  })}
  catch(err){
    console.error(err);
    next(err)
  }
}

async function getMeController(req,res,next){

  try{
    const user = await userModel.findById(req.user.id)
    if(!user){
      const error = new Error("User not found")
      error.statusCode = 404
      throw error
    }
    res.status(200).json({
      username:user.username,
      email:user.email
    })
  }
  catch(err){
    console.error(err);
    next(err)
  }
}

async function logOutController(req,res,next){
  const token = req.cookies.token
  res.clearCookie("token")
  await redis.set(token, Date.now().toString(),"EX",60*60)
  res.status(200).json({
    message:"Logout Successfully"
  })
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logOutController
}