const userModel = require('../model/user.model')
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController (req, res) {
  const { username ,email , password , bio , profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

if(isUserAlreadyExists){
  return res.status(409).json({
    message: "User already exists " +
      (isUserAlreadyExists.email === email 
        ? "Email Already Exists" 
        : "Username Already Exists")
  })
}

  const hash = crypto.createHash("sha256").update(password).digest("hex")
  const user = await userModel.create({
    username,
    email,
    password:hash,
    bio,
    profileImage
  })

  const token = jwt.sign({
    id : user._id
  },process.env.JWT_SECRET,{expiresIn:"2h"})

  res.cookie("token",token)
  res.status(201).json({
    message:"User registered Successfully",
    user :{
      name:user.username,
      email:user.email,
      bio:user.bio,
      Image:user.profileImage
    }
  })
  
}

async function loginController(req,res){
  const { username ,email , password} = req.body;
  const user = await userModel.findOne({
    $or:[
      {username},
      {email},
    ]
  })
  if(!user){
    return res.status(404).json({
      message:"User is not Found "
    })
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = hash === user.password

  if(!isPasswordValid){
    return res.status(401).json({
      message:"Invalid Password"
    })
  }


  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRET,{expiresIn:"3h"})
  res.cookie("token",token)

  res.status(200).json({
    message:"User logged in successfully",
    user:{
      name : user.username,
      email: user.email,
      bio : user.bio,
      Image : user.profileImage
    }
  })

}

module.exports= {
  loginController,
  registerController
}