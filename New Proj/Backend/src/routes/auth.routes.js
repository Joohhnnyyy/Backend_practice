const express = require("express")
const authRouter = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")
const authController = require("../controllers/auth.controller")
const authValidator = require("../validators/authValidator")
const { errorHandler } = require("../middlewares/errorHandler.middleware")
const { asyncHandler } = require("../middlewares/asyncHandler.middleware")
const validation = require("../middlewares/validation.middleware")

// Register Route
authRouter.post("/register",authValidator.registerValidationRules(),authValidator.validate,authController.registerController)


// Login Route
authRouter.post("/login",authValidator.loginValidationRules(),authValidator.validate,authController.loginController)

//get-me route

authRouter.get("/get-me",authMiddleWare.authUser,authController.getMeController)

//logout route

authRouter.post("/logout",authController.logOutController);

module.exports = authRouter;