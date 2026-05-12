import React from 'react'
import FormGroup from '../components/FormGroup'
import '../styles/register.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Register = () => {

  const { loading , register } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    register({username,email,password})
    navigate("/")
  }
  return (
    <div className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup 
            label="Username" 
            id="username" 
            placeholder="Enter your username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormGroup 
            label="Email" 
            id="email" 
            placeholder="Enter your email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup 
            label="Password" 
            id="password" 
            placeholder="Enter your password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register