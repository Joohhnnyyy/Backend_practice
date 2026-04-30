import axios from "axios";


const api = axios.create({
  baseURL:"http://localhost:3000/api/user",
  withCredentials:true
})


export const getAllUsers = async() => {
  try{
    const response = await api.get("/users")
    return response.data
  }
  catch(error){
    throw error.response.data
  }
}
export const allFollowers = async() => {
  try{
    const response = await api.get("/followers")
    return response.data
  }
  catch(error){
    throw error.response.data
  }
}

export const allFollowing = async() => {
  try{
    const response = await api.get("/following")
    return response.data
  }
  catch(error){
    throw error.response.data
  }
}

export const followUser = async (username) => {
  try {
    const response = await api.post(`/follow/${username}`);
    return response.data; 
  }
  catch (error) {
    throw error.response.data
  }
}
export const unfollowUser = async (username) => {
  try {
    const response = await api.delete(`/unfollow/${username}`);
    return response.data; 
  }
  catch (error) {
    throw error.response.data
  }
}

export const removeFollower = async (username) => {
  try {
    const response = await api.delete(`/unfollow/${username}`);
    return response.data;
  }
  catch (error) {
    throw error.response.data;
  }
}