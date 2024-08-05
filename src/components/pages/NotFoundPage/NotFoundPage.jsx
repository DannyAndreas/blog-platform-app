import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import './NotFoundPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-div">
      <h1>Oooooops... Page Not Found-404 </h1>
      <p>The page you are looking for does not exist.</p>
      <Button className="not-found-button" onClick={() => navigate('/')}>
        Go to Home
      </Button>
    </div>
  )
}

export default NotFoundPage
