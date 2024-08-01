/* eslint-disable no-useless-catch */
export const fetchArticle = (slug, token) => async () => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    const data = await response.json()
    return data.article
  } catch (error) {
    throw error
  }
}
