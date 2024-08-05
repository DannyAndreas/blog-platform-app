import React, { useEffect } from 'react'
import { Pagination, Spin, Alert } from 'antd'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AllArticlesPage from '../pages/AllArticlesPage/AllArticlesPage'
import OneArticlePage from '../pages/OneArticlePage/OneArticlePage'
import Header from '../Header/Header'
import { fetchArticles } from '../../redux/actions/articles/fetchArticles'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CreateArticlePage from '../pages/CreateArticlePage/CreateArticlePage'
import EditArticlePage from '../pages/EditArticlePage/EditArticlePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import './App.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { page } = useParams()
  const currentPage = parseInt(page, 10) || 1
  const { articles, loading, error, total } = useSelector((state) => state.articles)
  const user = useSelector((state) => state.auth.user)
  const token = user ? user.token : null

  useEffect(() => {
    dispatch(fetchArticles(currentPage, token))
  }, [dispatch, currentPage, token])

  const onPageChange = (page) => {
    navigate(`/articles/page/${page}`)
  }

  if (loading) {
    return <Spin size="large" />
  }

  if (error) {
    return <Alert message="Ошибка загрузки статей" description={error.message} type="error" />
  }

  return (
    <>
      <div className="article-card-container3">
        <div className="article-card-container4">
          {articles.map((article) => (
            <AllArticlesPage key={article.slug} article={article} />
          ))}
        </div>
      </div>
      <Pagination
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSize={5}
        onChange={onPageChange}
        showSizeChanger={false}
        showQuickJumper={false}
      />
    </>
  )
}

const App = () => {
  const auth = useSelector((state) => state.auth)

  return (
    <Router>
      <Header />
      <div className="main-content-container">
        <Routes>
          <Route path="/" element={<Navigate to="/articles/page/1" />} />
          <Route path="/articles/page/:page" element={<HomePage />} />
          <Route path="/articles/:slug" element={<OneArticlePage />} />
          <Route path="/signin" element={auth.isAuthenticated ? <Navigate to="/" /> : <SignInPage />} />
          <Route path="/signup" element={auth.isAuthenticated ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/profile" element={auth.isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
          <Route path="/new-article" element={auth.isAuthenticated ? <CreateArticlePage /> : <SignInPage />} />
          <Route path="/articles/:slug/edit" element={auth.isAuthenticated ? <EditArticlePage /> : <SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
