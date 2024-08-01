import axios from 'axios'

export const unlikeArticle = (slug, token) => async (dispatch) => {
  try {
    const response = await axios.delete(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    dispatch({
      type: 'UNLIKE_ARTICLE_SUCCESS',
      payload: response.data.article
    })
  } catch (error) {
    dispatch({
      type: 'UNLIKE_ARTICLE_FAILURE',
      payload: error.message
    })
  }
}
