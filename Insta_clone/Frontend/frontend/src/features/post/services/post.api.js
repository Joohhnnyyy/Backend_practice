import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials:true
})

export async function getFeed(){
  const response = await api.get("/api/posts/feed")
  return response.data
}


export async function likePost(postId){
  const respose = await api.post(`/api/posts/like/${postId}`)
  return respose.data
}

export async function unlikePost(postId){
  const respose = await api.post(`/api/posts/unlike/${postId}`)
  return respose.data
}

export async function createPost(imageFile,caption){
  const formData = new FormData();
  formData.append("image",imageFile)
  formData.append("caption",caption)

  const response = await api.post("/api/posts", formData)
  return response.data
}