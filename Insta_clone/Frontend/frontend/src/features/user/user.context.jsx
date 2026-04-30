import {createContext, useContext} from 'react'
import {allFollowers, allFollowing ,getAllUsers, followUser as followUserApi, unfollowUser as unfollowUserApi, removeFollower as removeFollowerApi } from './services/user.api'

export const userContext = createContext()

export const UserProvider = ({children}) => {
const fetchAllUsers = async() => {
  try{
    const data = await getAllUsers()
    console.log("All users data:", data);
    return data.users || []
  }

  catch(error){
    console.error("Error fetching all users:", error);
    return []
  }
}

const fetchAllFollowers = async () => {
  try {
    const data = await allFollowers();
    console.log("Followers array:", data?.followers);
    return data?.followers || [];

  } catch (error) {
    console.error("Error in fetchAllFollowers:", error);
    return [];
  }
};

const fetchAllFollowing = async() => {
    try{
      const data = await allFollowing()
      console.log("Following data:", data);
      return data.following
    }
    catch(error){
      throw error
    }
  }

const followUser = async (username) => {
  try{
    const response = await followUserApi(username)
    return response
  }
  catch(error){
    throw error
  }
}

const unfollowUser = async (username) => {
  try{
    const response = await unfollowUserApi(username)
    return response
  }
  catch(error){
    throw error
  }
}

const removeFollower = async (username) => {
  try{
    const response = await removeFollowerApi(username)
    return response
  }
  catch(error){
    throw error
  }
}

  return (
    <userContext.Provider value={{fetchAllFollowers, fetchAllFollowing, fetchAllUsers, followUser, unfollowUser, removeFollower}}>
      {children}
    </userContext.Provider>
  )
}
