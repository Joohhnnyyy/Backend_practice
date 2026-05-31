import {Router} from "express"
import { registerValidator , loginValidator } from "../validator/auth.validator.js";
import { register,verifyEmail ,login ,getMe} from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const authRouter = Router()


/**
 * @route POST api/auth/register
 * @desc Register the a new user
 * @acces public
 * @body {username , email , password}
 */
authRouter.post("/register",registerValidator , register)

/** 
  * @route GET api/auth/verify-email
  * @desc Verify user's email address
  * @acces public
 */
authRouter.get("/verify-email",verifyEmail)

/**
 * @route POST api/auth/login
 * @desc Login user and return JWT token
 * @acces public
 * @body {email , password}
 */
authRouter.post("/login",loginValidator ,login)

/**
 * @route GET api/auth/get-me
 * @desc Get current logged-in user
 * @acces private
 */
authRouter.get("/get-me",authUser ,getMe);

export default authRouter;