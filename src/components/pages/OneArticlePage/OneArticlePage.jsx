import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, message, Modal, Spin, Tag, Statistic } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { parseISO, format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

import { fetchArticle } from '../../../redux/actions/articles/fetchArticle'
import { deleteArticle } from '../../../redux/actions/articles/deleteArticle'
import { likeArticle } from '../../../redux/actions/articles/likeArticle'
import { unlikeArticle } from '../../../redux/actions/articles/unlikeArticle'
import './OneArticlePage.css'

const OneArticlePage = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const token = user ? user.token : null
  const currentUser = user ? user.username : null
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchArticleData = async () => {
      setLoading(true)
      try {
        let fetchedArticle
        if (token) {
          fetchedArticle = await dispatch(fetchArticle(slug, token))
        } else {
          fetchedArticle = await dispatch(fetchArticle(slug))
        }
        setArticle(fetchedArticle)
        if (fetchedArticle && fetchedArticle.tagList) {
          setTags(fetchedArticle.tagList)
        }
      } catch (error) {
        message.error('Failed to fetch article')
      } finally {
        setLoading(false)
      }
    }
    fetchArticleData()
  }, [dispatch, slug, token])

  const formatDate = (date) => {
    const isoDateString = date
    const parsedDate = parseISO(isoDateString)
    return format(parsedDate, 'MMMM d, yyyy')
  }

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this article?',
      onOk: async () => {
        setDeleting(true)
        try {
          await dispatch(deleteArticle(slug, token))
          message.success('Article deleted successfully')
          navigate('/')
        } catch (error) {
          message.error('Failed to delete article')
        } finally {
          setDeleting(false)
        }
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  const handleLike = async () => {
    try {
      if (!token) {
        message.error('Чтобы лайкнуть статью, войдите в систему')
        return
      }

      if (article.favorited) {
        await dispatch(unlikeArticle(slug, token))
        message.success('Статья успешно убрана из избранного')
      } else {
        await dispatch(likeArticle(slug, token))
        message.success('Статья успешно добавлена в избранное')
      }
      const updatedArticle = await dispatch(fetchArticle(slug, token))
      setArticle(updatedArticle)
    } catch (error) {
      message.error('Не удалось обновить статус статьи')
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }

  if (!article) {
    return <div>Article not found</div>
  }

  const author = article ? article.author : {}
  const createdAt = article ? article.createdAt : null
  const favoritesCount = article ? article.favoritesCount : 0
  const favorited = article ? article.favorited : false

  return (
    <div className="article-full">
      <div className="author-full-section">
        <div className="author-name-container">
          <div className="author-full-container">
            <span className="author-name-full-text">{author.username}</span>
            <span className="full-publication-date-style">{formatDate(createdAt)}</span>
          </div>
          <div>
            <img className="author-avatar-image" src={author.image} alt={author.username} />
          </div>
        </div>

        {author.username === currentUser && (
          <div className="buttons-info-section">
            <Button type="primary" className="button-delete" onClick={handleDelete} loading={deleting}>
              Delete
            </Button>
            <Button
              className="button-edit"
              type="primary"
              onClick={() => {
                navigate(`/articles/${slug}/edit`)
              }}
            >
              Edit
            </Button>
          </div>
        )}
      </div>

      <div className="article-title-style">
        <h1 className="article-title-style-text">{article.title}</h1>
        <Button className="like-counter-inOne" type="article-title-views-count" onClick={handleLike}>
          <Statistic
            value={favoritesCount}
            prefix={favorited ? <HeartFilled className="heart-icon-liked" /> : <HeartOutlined className="heart-icon" />}
          />
        </Button>
      </div>

      <div className="tag-container">
        {tags.map((tag, index) => (
          <Tag key={index} color={index % 2 === 0 ? 'magenta' : 'red'}>
            {tag}
          </Tag>
        ))}
      </div>

      <div className="article-description-container">
        <p className="short-discription-text">{article.description}</p>
      </div>

      <div className="article-body-container">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default OneArticlePage
