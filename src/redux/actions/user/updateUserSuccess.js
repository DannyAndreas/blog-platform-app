export const updateUserSuccess = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
  return {
    type: 'UPDATE_USER_SUCCESS',
    payload: user
  }
}
