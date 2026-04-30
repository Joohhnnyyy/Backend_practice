import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()
  
  const { handleLogin, loading } = useAuth()
  if(loading){
    return <div>Loading...</div>
  }
  
  async function handleSubmit(e){
    e.preventDefault()
    handleLogin(username,password)
    .then((response)=>{
      console.log("Login successful",response)
      navigate("/")
    })
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onInput={(e)=>{
            setUsername(e.target.value)
          }}
          type="text" 
          name='username' 
          placeholder='Enter Username' />
          <input onInput={(e)=>{
            setpassword(e.target.value)
          }}
          type="password" 
          name='password' 
          placeholder='Enter Password' />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>Don't have an Account? <Link className="toggleAuthform" to="/register"> Register</Link></p>
      </div>
    </main>
  )
}

export default Login