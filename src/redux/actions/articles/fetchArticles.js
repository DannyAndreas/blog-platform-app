export const fetchArticles = (page = 1, token, favorited = '') => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_ARTICLES_REQUEST' })

      const limit = 5
      const offset = (page - 1) * limit
      const url = `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}${
        favorited ? `&favorited=${favorited}` : ''
      }`

      const headers = token ? { Authorization: `Token ${token}` } : {}

      const response = await fetch(url, { headers })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Неавторизованный доступ. Пожалуйста, войдите в систему.')
        }
        throw new Error('Ошибка загрузки статей')
      }

      const data = await response.json()
      dispatch({
        type: 'FETCH_ARTICLES_SUCCESS',
        payload: { articles: data.articles, total: data.articlesCount }
      })
    } catch (error) {
      console.error('Ошибка при получении статей:', error.message)
      dispatch({ type: 'FETCH_ARTICLES_FAILURE', error: error.message })
    }
  }
}
