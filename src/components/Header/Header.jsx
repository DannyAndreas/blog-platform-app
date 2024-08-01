import React from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../../redux/actions/auth/logout'
import './Header.css'

const Header = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="header-container">
      <Button
        type="primary"
        className="blog-title-text-style"
        onClick={() => {
          navigate('/')
        }}
      >
        Realworld Blog
      </Button>
      <div className="sign-in-container1">
        {auth.isAuthenticated ? (
          <>
            <Button
              type="primary"
              className="create-article-button"
              onClick={() => {
                navigate('/new-article')
              }}
            >
              Create Article
            </Button>

            <div
              className="user-container"
              onClick={() => {
                navigate('/profile')
              }}
            >
              <span>{auth.user.username}</span>
              <img
                className="author-avatar-image"
                src={auth.user.image}
                alt={auth.user.username}
                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
              />
            </div>
            <Button type="primary" className="log-out-button" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button type="primary">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
