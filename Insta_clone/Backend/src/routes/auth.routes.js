const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const authController = require("../controllers/auth.controller")
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */

authRouter.post("/login", authController.loginController)

/**
 * @route GET /api/auth/get-me
 * @desc Get the authenticated user's information
 * @access Private
 */

authRouter.get("/get-me", identifyUser, authController.getMeController)

module  .exports = authRouter;