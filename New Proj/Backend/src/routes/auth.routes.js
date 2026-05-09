const express = require("express")
const authRouter = express.Router();
const authMiddleWare = require("../middlewares/auth.middleware")
const authController = require("../controllers/auth.controller")

// Register Route
authRouter.post("/register",authController.registerController)


// Login Route
authRouter.post("/login",authController.loginController)

//get-me route

authRouter.get("/get-me",authMiddleWare.authUser,authController.getMeController)

//logout route

authRouter.post("/logout",authController.logOutController);

module.exports = authRouter;