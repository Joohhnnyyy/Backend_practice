import jwt from "jsonwebtoken"
import { errorHandler } from "./errorHandler.middleware.js";

export async function authUser(req,res,next){
  const token = req.cookies.token;
  if(!token){
    const error = new Error("Token is Not Valid")
    error.statusCode = 400
    throw error
  }
  try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET)
    req.user = decoded
    next();

  }catch(error){
    const err = new Error("Unauthorised")
    err.statusCode = 401
    throw err
  }


}