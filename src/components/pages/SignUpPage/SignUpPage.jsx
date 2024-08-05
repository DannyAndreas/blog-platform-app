import React from 'react'
import { useDispatch } from 'react-redux'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { addUser } from '../../../redux/actions/user/addUser'
import ArticleForm from '../../ui/ArticleForm/ArticleForm'
import './SignUpPage.css'

const SignUpPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignUp = async (values) => {
    try {
      await dispatch(addUser(values))
      message.success('Sign Up successful')
    } catch (error) {
      message.error('Sign Up failed')
    }
  }

  return (
    <div className="sign-up-div">
      <h1 className="centered-title">Create New Account</h1>
      <ArticleForm initialValues={{}} onSubmit={handleSignUp} loading={false} />
      <p style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        Already have an account?{' '}
        <a
          style={{ marginLeft: '5px' }}
          onClick={() => {
            navigate('/signin')
          }}
        >
          Sign In
        </a>
        .
      </p>
    </div>
  )
}

export default SignUpPage
