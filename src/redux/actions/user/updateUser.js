import axios from 'axios'

import { updateUserSuccess } from './updateUserSuccess'

export const updateUser = (userData) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token
    const config = {
      headers: {
        Authorization: `Token ${token}`
      }
    }
    const response = await axios.put('https://blog.kata.academy/api/user', { user: userData }, config)
    dispatch(updateUserSuccess(response.data.user))
  } catch (error) {
    console.error('Update user failed', error)
    throw error
  }
}
