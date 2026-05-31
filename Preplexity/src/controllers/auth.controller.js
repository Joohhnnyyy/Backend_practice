import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../services/mail.service.js"; 
import { errorHandler } from "../middlewares/errorHandler.middleware.js";

export async function register(req,res){

  const {username ,email , password} = req.body
  const isUserAlreadyExist = await userModel.findOne({
    $or:[{email} , {username}]
  })

  if(isUserAlreadyExist){
    return res.status(400).json({
      meesage:"Username or email already Exist",
      success: false,
      err:"User Already Exist"
    })
  }

  const user = await userModel.create({
    username,email,password
  })

  const emailVerificationToken = jwt.sign({
    email:user.email
  },process.env.JWT_SECRET,{expiresIn: "1d"})

  void sendEmail({
    to:email,
    subject:"Welome to Perplexity!",
    text:`Hi ${username} , \n\n Thanks you for registering at Perplexity , we'are excitred to have you on board \n\n Best Regards \n Perplexity Team`,
    html:`<p>Hi ${username} , </p>
    <p>Thanks you for registering at Perplexity , we'are excitred to have you on board</p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}" style="display:inline-block;padding:10px 20px;font-size:16px;color:#fff;background-color:#007bff;border-radius:5px;text-decoration:none;">Verify Email</a>
    <p>Best Regards<br>Perplexity Team</p>`
  }).catch((error) => {
    console.error("Registration email failed:", error);
  });

  res.status(201).json({
    message:"User Registered Successfully",
    success:true,
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })

}

export async function verifyEmail(req,res){
  const {token} = req.query;
try {  

  const decoded = jwt.verify(token , process.env.JWT_SECRET)


  const user = await userModel.findOne({email : decoded.email});
  if(!user){
    return res.status(400).json({
      message:"Invalid Token",
      success:false,
      err:"User not found"
    })
  }
  user.verified = true;
  await user.save();
  const html = `<h1>Email Verified Successfully</h1>
  <p>Your email has been verified successfully. You can now log in to your account.</p>
  <a href="http://localhost:3000/api/auth/login" style="display:inline-block;padding:10px 20px;font-size:16px;color:#fff;background-color:#007bff;border-radius:5px;text-decoration:none;">Go to Login</a>
  `
  return res.status(200).send(html);
}
  catch(error){
    return res.status(400).json({
      message:"Invalid or Expired token",
      success:false,
      err: error.meesage
    })
  }
}

export async function login(req,res){
  const {email , password} = req.body;
  const user = await userModel.findOne({ email }).select("+password")

  if(!user){
    return res.status(400).json({
      message:"User not found",
      success:false,
      err:"User does not exist"
    })
  }

  const isPasswordMatch = await user.comparePassword(password);
  if(!isPasswordMatch){
    return res.status(400).json({
      message:"Invalid Password",
      success:false,
      err:"Incorrect Password"
    })
  }

  if(!user.verified){
    return res.status(400).json({
      message:"Please Verify your email Before Logging in",
      success:false,
      err:"Email not verified"
    })
  }

  const token = jwt.sign({
    id:user._id,
    username:user.username,
    email:user.email
  },process.env.JWT_SECRET , {expiresIn:"2d"})

  res.cookie("token", token)

  return res.status(200).json({
    message:"Login Successful",
    success:true,
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })
}


export async function getMe(req,res){
  try{
    const user = await userModel.findById(req.user.id)
    if(!user){
      const error = new Error("User not Found")
      error.statusCode = 400
      throw error
    }
    res.status(200).json({
      message:"User found ",
      user
    })

  }catch(err){
    console.log(err)
  }
}