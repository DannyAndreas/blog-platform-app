import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button, message } from 'antd'

import { updateUser } from '../../redux/actions/user/updateUser'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleUpdate = async (values) => {
    try {
      await dispatch(updateUser(values))
      message.success('Profile updated successfully')
    } catch (error) {
      message.error('Profile update failed')
    }
  }

  return (
    <div className="edit-profile-div">
      <h1>Edit Profile</h1>
      <Form initialValues={user} onFinish={handleUpdate}>
        <p>Username</p>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <p>Email address</p>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <p>New password</p>
        <Form.Item name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <p>Avatar image (url)</p>
        <Form.Item name="image">
          <Input placeholder="Image URL" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ProfilePage
