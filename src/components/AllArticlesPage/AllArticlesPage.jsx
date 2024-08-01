import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Statistic, Tag, Button, message } from 'antd'
import { parseISO, format } from 'date-fns'

import './AllArticlesPage.css'
import { likeArticle } from '../../redux/actions/articles/likeArticle'
import { unlikeArticle } from '../../redux/actions/articles/unlikeArticle'

const AllArticlesPage = ({ article }) => {
  const { title, favoritesCount, description, createdAt, tagList, author, slug, favorited } = article

  const filteredTags = tagList.filter((tag) => tag)
  const maxTags = 10
  const tagsToDisplay = filteredTags.slice(0, maxTags)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const token = user ? user.token : null

  const [localFavoritesCount, setLocalFavoritesCount] = useState(favoritesCount)
  const [localFavorited, setLocalFavorited] = useState(favorited)
  const [loading, setLoading] = useState(false)

  const formatDate = (date) => {
    const isoDateString = date
    const parsedDate = parseISO(isoDateString)
    return format(parsedDate, 'MMMM d, yyyy')
  }

  const handleLike = async () => {
    if (loading) return
    setLoading(true)
    try {
      if (!token) {
        message.error('Чтобы лайкнуть статью, войдите в систему')
        return
      }
      if (localFavorited) {
        await dispatch(unlikeArticle(slug, token))
        setLocalFavoritesCount((prevCount) => prevCount - 1)
        setLocalFavorited(false)
        message.success('Статья успешно убрана из избранного')
      } else {
        await dispatch(likeArticle(slug, token))
        setLocalFavoritesCount((prevCount) => prevCount + 1)
        setLocalFavorited(true)
        message.success('Статья успешно добавлена в избранное')
      }
    } catch (error) {
      message.error('Ошибка при обновлении статуса избранного')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="article-card-container">
      <div className="article-card-container1">
        <div className="article-card-container2">
          <div className="article-info-container">
            <Link to={`/articles/${slug}`}>
              <p className="article-title-paragraph">
                {title.trim() !== '' ? title : 'Title is unavailable'} {/* Заглушка для title */}
              </p>
            </Link>
            <div className="article-view-container">
              <div className="article-views-count-label">
                <Button className="like-counter" type="article-title-views-count" onClick={handleLike}>
                  <Statistic
                    value={localFavoritesCount}
                    prefix={
                      localFavorited ? (
                        <HeartFilled className="heart-icon-liked" />
                      ) : (
                        <HeartOutlined className="heart-icon" />
                      )
                    }
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="article-content-section">
            <div className="tag-category-subset-container">
              <div className="tag-container-subset">
                <div className="tag-container">
                  {tagsToDisplay.map((tag, index) => (
                    <Tag key={index} color={index % 2 === 0 ? 'magenta' : 'red'}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
            <p className="article-content-text-style">
              {description.trim() !== '' ? description : 'Description is unavailable'} {/* Заглушка для description */}
            </p>
          </div>
        </div>
        <div className="author-info-section">
          <div className="author-info-container">
            <span className="author-name-text-style">{author.username}</span>
            <span className="publication-date-style">{formatDate(createdAt)}</span>
          </div>
          <img className="author-avatar-image" src={author.image} alt={author.username} />
        </div>
      </div>
    </div>
  )
}
export default AllArticlesPage
