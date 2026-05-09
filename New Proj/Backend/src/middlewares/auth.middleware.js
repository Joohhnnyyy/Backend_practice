const jwt = require("jsonwebtoken")
const blackListModel = require("../models/blacklist.model.js")
const redis = require("../config/cache")

async function authUser(req,res,next){

const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      message:"Unauthorized Token not found"
    })
  }

  const isTokenBlackListed = await redis.get(token)

  if(isTokenBlackListed){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch(err){
    return res.status(401).json({
      message:"Unauthorized Invalid Token"
    })
}
}

module.exports = {
  authUser
};