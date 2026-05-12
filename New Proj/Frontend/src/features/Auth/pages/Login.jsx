import React from 'react'
import FormGroup from '../components/FormGroup'
import '../styles/login.scss'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

  const { loading , login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()

    await login({email,password})
    navigate("/")
  }



  return (
    <main>
      <div className="login-page">
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <FormGroup
              value={email}
              onChange = {((e) => setEmail(e.target.value))}
              label="Email"
              id="email"
              placeholder="Enter your email"
              type="email"
              required
            />
            <FormGroup
              value={password}
              onChange = {((e) => setPassword(e.target.value))}
              label="Password"
              id="password"
              placeholder="Enter your password"
              type="password"
              required
            />
            <button className='button' type="submit">
              Login
            </button>
          </form>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </main>
  )
}

export default Login