import axios from 'axios'

import { loginSuccess } from './loginSuccess'

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('https://blog.kata.academy/api/users/login', { user: credentials })
    dispatch(loginSuccess(response.data.user))
  } catch (error) {
    console.error('Login failed', error)
    throw error
  }
}
