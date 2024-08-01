import axios from 'axios'

export const updateArticleSuccess = (article) => ({
  type: 'UPDATE_ARTICLE_SUCCESS',
  payload: article
})

export const updateArticle = (slug, articleData, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.put(`https://blog.kata.academy/api/articles/${slug}`, { article: articleData }, config)
    dispatch(updateArticleSuccess(response.data.article))
    return response.data.article
  } catch (error) {
    console.error('Update article failed', error)
    throw error
  }
}
