import axios from 'axios'

export const addUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('https://blog.kata.academy/api/users', { user })
    dispatch({
      type: 'ADD_USER',
      payload: response.data.user
    })
  } catch (error) {
    console.error('Failed to add user', error)
  }
}
