import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { loginUser } from '../../redux/actions/auth/loginUser'
// import './miniModal.css'

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
      <Form onFinish={handleSignIn}>
        <p className="bold">Email</p>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input className="email-sign-in" placeholder="Email" />
        </Form.Item>
        <p className="bold">Password</p>
        <Form.Item
          className="password-sign-in"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button className="button-sign-in" type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <p style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
          Dont have an account?
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
      </Form>
    </div>
  )
}

export default SignInPage
