const userModel = require("../models/users.auth")
const blackListModel = require("../models/blacklist.model")
const authMiddleware = require("../middlewares/auth.middleware")
const redis = require("../config/cache")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
}

async function registerController(req,res){
try{  const {username , email, password } = req.body;
  if(!username || !email || !password){
    return res.status(400).json({
      message:"All fields are required"
    })
  }

  const isUserAlreadyExist = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })
  

if (isUserAlreadyExist) {
  if (isUserAlreadyExist.email === email) {
    return res.status(409).json({
      message: "Email already exists"
    });
  } else {
    return res.status(409).json({
      message: "Username already exists"
    });
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
  })}

  catch(err){
    console.error(err);
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

async function loginController(req,res){
try
{  
const {email,password ,username} = req.body;

  if(!email || !password){
    return res.status(400).json({
      message:"All fields are required"
    })
  }
  const user = await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  }).select("+password")
  if(!user){
    return res.status(404).json({
      message:"Invalid Credentials"
    })
  }
const isPasswordMatch = await bcrypt.compare(password,user.password)
  if(!isPasswordMatch){
    return res.status(404).json({
      message:"Invalid Credentials"
    })
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
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

async function getMeController(req,res){

  try{
    const user = await userModel.findById(req.user.id)
    if(!user){
      return res.status(404).json({
        message:"Invalid Credentials"
      })
    }
    res.status(200).json({
      username:user.username,
      email:user.email
    })
  }
  catch(err){
    console.error(err);
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
}

async function logOutController(req,res){
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