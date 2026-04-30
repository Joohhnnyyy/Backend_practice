import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()
  const { handleRegister, loading } = useAuth()
  if(loading){
    return <div>Loading...</div>
  }


  async function handleSubmit(e){
    e.preventDefault()
    handleRegister(username,email,password)
    .then((response)=>{
      console.log("Registration successful",response)
      navigate("/")
    })
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input 
          onInput={(e)=>{
            setUsername(e.target.value)
          }}
          type="text" 
          name='username' 
          placeholder='Enter Username' />
          <input
          onInput={(e)=>{
            setemail(e.target.value)
          }}
          type="email" 
          name='email' 
          placeholder='Enter Email' />
          <input 
          onInput={(e)=>{
            setpassword(e.target.value)
          }}
          type="password" 
          name='password' 
          placeholder='Enter Password' />
          <button>Register</button>
        </form>
        <p>Already have an account?<Link className="toggleAuthForm" to="/login"> Login</Link> </p>
      </div>
    </main>
  )
}

export default Register