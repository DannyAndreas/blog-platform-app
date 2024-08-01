import axios from 'axios'

export const createArticleSuccess = (article) => ({
  type: 'CREATE_ARTICLE_SUCCESS',
  payload: article
})
export const createArticle = (articleData, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.post('https://blog.kata.academy/api/articles', { article: articleData }, config)
    dispatch(createArticleSuccess(response.data.article))
    return response.data.article
  } catch (error) {
    console.error('Create article failed', error)
    throw error
  }
}
