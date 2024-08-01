import axios from 'axios'
import { message } from 'antd'

export const deleteArticle = (slug, token) => async (dispatch) => {
  try {
    await axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    dispatch({ type: 'DELETE_ARTICLE_SUCCESS', payload: slug })
  } catch (error) {
    message.error('Failed to delete article')
    throw error
  }
}
