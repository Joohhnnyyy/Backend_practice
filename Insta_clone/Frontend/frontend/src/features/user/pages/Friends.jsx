import React, { useState ,useEffect } from 'react'
import '../style/friends.scss'
import {useUser} from '../hooks/useUser'

const Friends = () => {
  const {fetchAllFollowers, fetchAllFollowing , fetchAllUsers , followUser, unfollowUser, removeFollower} = useUser()
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [users, setUsers] = useState([])


  const handleFollow = async (username) => {
  await followUser(username)
  const usersData = await fetchAllUsers()
  const followersData = await fetchAllFollowers()
  const followingData = await fetchAllFollowing()

  setUsers(usersData)
  setFollowers(followersData)
  setFollowing(followingData)
}

const handleUnfollow = async (username) => {
  await unfollowUser(username)
  const followersData = await fetchAllFollowers()
  const followingData = await fetchAllFollowing()

  setFollowers(followersData)
  setFollowing(followingData)
}

const handleRemoveFollower = async (username) => {
  await removeFollower(username)
  const followersData = await fetchAllFollowers()
  setFollowers(followersData)
}

useEffect(() => {
  const loadData = async () => {
    const followersData = await fetchAllFollowers()
    const followingData = await fetchAllFollowing()
    const usersData = await fetchAllUsers()

    setFollowers(followersData)
    setFollowing(followingData)
    setUsers(usersData)
  }

  loadData()
}, [])


  if(!fetchAllFollowers || !fetchAllFollowing){
    return <div>Loading...</div>
  }
console.log("Followers:", followers)
console.log("Following:", following)


  return (
    <main className="main  ">
      <div className="left">
        <div className="followers ">
          <div className="follower-list ">
            <h2 >Followers</h2>
            {followers.length === 0 ? (
              <p>No followers yet.</p>
            ) : (
              followers.map((follower, index) => (
                <div key={index} className="follower ">
                  <img src={follower.profileImage || "https://randomuser.me/api/portraits/men/1.jpg"} alt={`Follower ${index + 1}`} />
                  <p className='follower-text'>{follower.username}</p>
                  <button className='left-button' onClick={() => handleRemoveFollower(follower.username)}>Remove</button>
                </div>
              ))
            )}

          </div>
        </div>
        <div className="following">
          <div className="following-list">
            <h2 className='text-xl'>Following</h2>
            {following.length === 0 ? (
              <p>Not following anyone yet.</p>
            ) : (
              following.map((followee, index) => (
                <div key={index} className="following-people">
                  <img src={followee.profileImage || "https://randomuser.me/api/portraits/women/2.jpg"} alt={`Following ${index + 1}`} />
                  <p className='following-text'>{followee.username}</p>
                  <button className='left-button' onClick={() => handleUnfollow(followee.username)}>Unfollow</button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
      <div className="right ">
        <h2 className='text-xl '>Friend Suggestions</h2>

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user, index) => (
            <div key={index} className="suggestion ">
              <img src={user.profileImage || "https://randomuser.me/api/portraits/men/3.jpg"} alt={`Suggestion ${index + 1}`} />
              <span className='suggestion-text'>{user.username}</span>
              {following.some(f => f.username === user.username) ? (
  <button className="right-button" disabled>
    Following
  </button>
) : (
  <button 
    className="right-button" 
    onClick={() => handleFollow(user.username)}
  >
    Follow
  </button>
)}
            </div>
          ))
        )}
      </div>
    </main>
  )
}

export default Friends