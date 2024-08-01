import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { addUser } from '../../redux/actions/user/addUser'

const SignUpPage = (type) => {
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
  const isSignIn = type === 'signIn'
  return (
    <div className="sign-up-div">
      <h1 className="centered-title">Create New Account</h1>
      <Form onFinish={handleSignUp}>
        <p className="bold">Username</p>
        <Form.Item
          name="username"
          className="my-form-item"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 5, message: 'Username must be at least 5 characters long!' }
          ]}
        >
          <Input placeholder="Username" autoComplete="off" />
        </Form.Item>
        <p className="bold">Email</p>
        <Form.Item
          name="email"
          className="my-form-item"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}
        >
          <Input placeholder="Email Address" autoComplete="off" />
        </Form.Item>
        <p className="bold">Password</p>
        <Form.Item
          name="password"
          className="my-form-item"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' },
            {
              pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
              message: 'Password must contain at least one digit and one special character!'
            }
          ]}
          hasFeedback={!isSignIn}
        >
          <Input.Password placeholder="Password" autoComplete="off" />
        </Form.Item>
        <p className="bold">Repeat Password</p>
        <Form.Item
          name="confirm"
          className="my-form-item"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password placeholder="Repeat Password" autoComplete="off" />
        </Form.Item>
        <Form.Item
          name="agreement"
          className="my-form-item"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('You must agree to the processing of your personal information!')
            }
          ]}
        >
          <Checkbox>I agree to the processing of my personal information</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button className="button-sign-in" type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
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
      </Form>
    </div>
  )
}

export default SignUpPage
