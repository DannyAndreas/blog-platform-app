import axios from 'axios'

export const likeArticle = (slug, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    dispatch({
      type: 'LIKE_ARTICLE_SUCCESS',
      payload: response.data.article
    })
  } catch (error) {
    dispatch({
      type: 'LIKE_ARTICLE_FAILURE',
      payload: error.message
    })
  }
}
