import React from 'react'
import '../nav.scss'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const nav = useNavigate()
  return (
    <nav className='nav-bar'>
      <h1>InstaClone</h1>
      <div className="nav-links">
        <div className="right">
          <button onClick={()=>{
            nav("/create-post")
          }}
          >Create Post</button>

        </div>
      </div>
    </nav>
  )
}

export default Nav