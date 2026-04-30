const postModel = require("../model/post.model")
const Imagekit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../model/like.model")


const imagekit = Imagekit({
  privateKey : process.env.IMAGE_PRIVATE_KEY
})

async function createPostContoller(req,res) {
  console.log('createPost request', { body: req.body, file: !!req.file, user: req.user && req.user.id });
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), 'file'),
      fileName: 'fileName',
      folder: "Insta-clone-posts"
    });
    const post = await postModel.create({
      caption: req.body.caption,
      imgUrl: file.url,
      user: req.user.id
    });
    res.status(201).json({
      messgae: "post Created successfully",
      post
    });
  } catch (err) {
    console.error('createPost error:', err);
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }




}

async function getPostController(req,res){

  const userId = req.user.id;
  const posts = await postModel.find({
    user: userId
  })

  res.status(200).json({
    messgae:"Post Feteched Successfully",
    posts
  })

}

async function getPostDetailes(req,res){

  const userId = req.user.id;
  const postId = req.params.postId
  const post = await postModel.findById(postId)
  if(!post){
    return res.status(404).json({
    message:"post not found"
    })
  }

  const isValidUser = post.user.toString() === userId
  if(!isValidUser){
    return res.status(403).json({
      messgae:"Forbidden content"
    })
  }

  return res.status(200).json({
    messgae:"post featch successfully",
    post
  })
}

async function likePostController(req,res){
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExist = await postModel.findById(postId);
  if(!isPostExist){
    return res.status(404).json({
      message :"Post Not Found"
    })
  }

  const alreadyLiked = await likeModel.findOne({
    post: postId,
    user: username
  })
  if(alreadyLiked){
    return res.status(409).json({
      message:"Post is already liked"
    })
  }

  const like = await likeModel.create({
    post:postId,
    user:username
  })
  res.status(200).json({
    message: "Post Liked Successfully",
    like
  })

}

async function unlikePostController(req,res){
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExist = await postModel.findById(postId);
  if(!isPostExist){
    return res.status(404).json({
      message :"Post Not Found"
    })
  }
  const isLiked = await likeModel.findOne({
    user:username,
    post:postId
  })
  if(!isLiked){
    return res.status(400).json({
      message:"Post is not liked yet"
    })
  }
  await likeModel.findByIdAndDelete({ _id: isLiked._id })
  return res.status(200).json({
    message:"Post Unliked Successfully"
  })
}

async function getFeedController(req, res) {

  const user = req.user;
  try {
    const postsRaw = await postModel.find({}).sort({ _id: -1 }).populate("user").lean();
    const posts = await Promise.all(
      postsRaw.map(async (post) => {
        const isLiked = await likeModel.findOne({ post: post._id, user: user.username });
        post.isLiked = !!isLiked;
        return post;
      })
    );





    res.status(200).json({
      message: "Feed Fetched Successfully",
      posts
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching feed",
      error: error.message
    });
  }
}

module.exports = {
  createPostContoller,
  getPostController,
  getPostDetailes,
  likePostController,
  getFeedController,
  unlikePostController
}
