const express = require("express")
const postRouter = express.Router();
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")
const postController = require("../controllers/post.controller")
const getFeedController = require("../controllers/post.controller")

/**
@route POST /api/post/
 * 
 */
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostContoller)

/**
@route GET /api/post/
 * 
 */

postRouter.get("/",identifyUser,postController.getPostController)


/**
@route GET /api/post/details/:postid
 * 
 */

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailes)

/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in thge requeest params
 */

postRouter.post("/like/:postId",identifyUser,postController.likePostController)


/** * @route POST /api/posts/unlike/:postid
 * @description unlike a post with the id provided in thge requeest params
 */

postRouter.post("/unlike/:postId",identifyUser,postController.unlikePostController)

/**
 * @route GET /api/posts/feed
 * @description get the feed of posts for the authenticated user
 * @access Private
 */

postRouter.get("/feed",identifyUser,postController.getFeedController)


module.exports = postRouter;