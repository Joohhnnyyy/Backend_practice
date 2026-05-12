import axios from 'axios'


const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true
})

export async function register({email,password,username}){
  const response = await api.post("/register", { username, email, password })
  return response.data
}

export async function login({email,password,username}){
  const response = await api.post("/login",{
    username,email,password
  })
  return response.data
}

export async function getMe(){
  const response = await api.get("/get-me")
  return response.data
}

export async function logOut(){
  const response = await api.get("/logout")
  return response.data
}