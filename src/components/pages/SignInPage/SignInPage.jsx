import React from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../../../redux/actions/auth/loginUser'
import ArticleForm from '../../ui/ArticleForm/ArticleForm'
import './SignInPage.css'

const SignInPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignIn = async (values) => {
    try {
      await dispatch(loginUser(values))
      message.success('Login successful')
    } catch (error) {
      message.error('Login failed')
    }
  }

  return (
    <div className="sign-in-div">
      <h1 className="centered-title">Sign In</h1>
      <ArticleForm initialValues={{}} onSubmit={handleSignIn} loading={false} />
      <p style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        Don`&apos;`t have an account?
        <a
          onClick={() => {
            navigate('/signup')
          }}
          style={{ marginLeft: '5px' }}
        >
          Sign Up
        </a>
        .
      </p>
    </div>
  )
}

export default SignInPage
