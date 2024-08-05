import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import { updateUser } from '../../../redux/actions/user/updateUser'
import ArticleForm from '../../ui/ArticleForm/ArticleForm'
import './ProfilePage.css'

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
      <ArticleForm initialValues={user} onSubmit={handleUpdate} loading={false} />
    </div>
  )
}

export default ProfilePage
