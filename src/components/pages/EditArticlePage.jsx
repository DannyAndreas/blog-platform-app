import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'

import { updateArticle } from '../../redux/actions/articles/updateArticle'
import { fetchArticle } from '../../redux/actions/articles/fetchArticle'
import { clearArticle } from '../../redux/actions/articles/clearArticle'

import './EditAndCreateStyle.css'
import ArticleForm from './ArticleForm'

const EditArticlePage = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.user.token)
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const fetchedArticle = await dispatch(fetchArticle(slug, token))
        setArticle(fetchedArticle)
      } catch (error) {
        message.error('Failed to fetch article')
      }
    }
    fetchArticleData()
    return () => {
      dispatch(clearArticle())
    }
  }, [dispatch, slug, token])

  const handleSubmit = async (values) => {
    setLoading(true)
    try {
      await dispatch(updateArticle(slug, values, token))
      message.success('Article updated successfully')
      navigate(`/articles/${slug}`)
    } catch (error) {
      message.error('Failed to update article')
    } finally {
      setLoading(false)
    }
  }

  if (!article) {
    return <div>Loading...</div>
  }

  return (
    <div className="edit-article-div">
      <h1 className="edit-title">Edit Article</h1>
      <ArticleForm initialValues={article} onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}

export default EditArticlePage
