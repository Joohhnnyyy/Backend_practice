const followModel = require("../model/follow.model.js");
const userModel = require("../model/user.model.js");


async function allUsersController(req,res){
  const users = await userModel.find().select("username profileImage")
  res.status(200).json({
    message:"All Users Fetched Successfully",
    count:users.length,
    users
  })
}

async function followUserController(req,res){
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;
  if(followeeUsername == followerUsername){
    return res.status(400).json({
      message:"You cannot follow youself"
    })
  }
  const isFolloweeExist = await userModel.findOne({
    username:followeeUsername
  })
  if(!isFolloweeExist){
    return res.status(404).json({
      message:"User you are trying to follow does not exist"
    })
  }
  const isAlreadyFollow = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
  })

  if(isAlreadyFollow){
    return res.status(409).json({
      message:`Already Following ${followeeUsername}`
    })
  }
  const followRecord = await followModel.create({
    follower:followerUsername,
    followee:followeeUsername
  })
  res.status(201).json({
    message: `you are now following ${followeeUsername}`,
    follow:followRecord
  })

}

async function allFollowers(req, res) {
  try {
    const username = req.user.username;

    const followers = await followModel.find({
      followee: username,
      status: "Accepted"
    });

    // extract follower usernames
    const followerUsernames = followers.map(f => f.follower);

    // fetch user details
    const users = await userModel.find({
      username: { $in: followerUsernames }
    }).select("username profileImage");

    res.status(200).json({
      message: "Followers fetched successfully",
      count: users.length,
      followers: users
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function allFollowing(req, res) {
  try {
    const username = req.user.username;

    const following = await followModel
    .find({
      follower: username,
      status: "Accepted"
    })
    
    const followingUsernames = following.map(f => f.followee);

    const users = await userModel.find({
      username: { $in: followingUsernames }
    }).select("username profileImage");


    res.status(200).json({
      message: "Following fetched successfully",
      count: users.length,
      following: users
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function unfollowUserController(req,res){
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;
// 1. Prevent self-unfollow first
  if(followeeUsername == followerUsername){
    return res.status(400).json({
      message:"You cannot unfollow yourself"
    })
  }
// 2. Check if user exists  
  const isUnfolloweeExist = await userModel.findOne({
    username:followeeUsername
  })
  if(!isUnfolloweeExist){
    return res.status(404).json({
      message:"User you are trying to unfollow does not exist"
    })
  }

// 3. Check if already following
  const isUserFollowing = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername
  })
  if(!isUserFollowing){
    return res.status(400).json({
      message:`you are not Following this user ${followeeUsername}`
    })
  }

  const unfollowRecord = await followModel.findByIdAndDelete(isUserFollowing._id)
  res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`,
    follow:unfollowRecord
  })
}


async function acceptFollowRequestController(req,res){
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  const acceptStatus = await followModel.findOneAndUpdate({
    follower :followerUsername,
    followee :followeeUsername,
    status:"Pending"
  },{
    status:"Accepted"
  },{
    new:true
  })

  if(!acceptStatus){
  return res.status(400).json({
    message:"No Pending request Found"
  })
}
  res.status(200).json({
    message:"Follow Request Accepted",
    acceptStatus
  })
}


async function rejectFollowRequestController(req,res){
  const followeeUsername = req.user.username;
  const followerUsername = req.params.username;

  const rejectStatus = await followModel.findOneAndUpdate({
    follower :followerUsername,
    followee :followeeUsername,
    status:"Pending"
  },{
    status:"Rejected"
  },{
    new:true
  })

  if(!rejectStatus){
  return res.status(400).json({
    message:"No Pending request Found"
  })
}
  res.status(200).json({
    message:"Follow Request Rejected",
    rejectStatus
  })
}

module.exports = {
  followUserController,
  unfollowUserController,
  acceptFollowRequestController,
  rejectFollowRequestController,
  allFollowers,
  allFollowing,
  allUsersController
};