const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


///post("/api/user/follow/:userid")
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

userRouter.get("/followers",identifyUser,userController.allFollowers)

userRouter.get("/following",identifyUser,userController.allFollowing)

userRouter.get("/users",identifyUser,userController.allUsersController)

userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

userRouter.patch("/follow/:username/accept",identifyUser,userController.acceptFollowRequestController)

userRouter.patch("/follow/:username/reject",identifyUser,userController.rejectFollowRequestController)

module.exports = userRouter;