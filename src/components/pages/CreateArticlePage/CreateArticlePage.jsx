import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

import { createArticle } from '../../../redux/actions/articles/createArticle'
import ArticleForm from '../../ui/ArticleForm/ArticleForm'
import './CreateArticlePage.css'

const CreateArticlePage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.user.token)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await dispatch(createArticle({ ...values, tagList: values.tagList }, token))
      message.success('Article created successfully')
      navigate('/')
    } catch (error) {
      message.error('Failed to create article')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="edit-article-div">
      <h1 className="edit-title">Create New Article</h1>
      <ArticleForm onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default CreateArticlePage
